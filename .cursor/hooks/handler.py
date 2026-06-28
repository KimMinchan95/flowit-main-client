#!/usr/bin/env python3
"""Cursor hooks: session state, approval guard, JSONL logging."""

from __future__ import annotations

import json
import re
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOG_DIR = ROOT / ".cursor" / "ai-logs"
STATE_FILE = LOG_DIR / ".session-state.json"

MUTATION_TOOLS = frozenset(
    {
        "Write",
        "StrReplace",
        "Delete",
        "EditNotebook",
        "ApplyPatch",
    }
)

APPROVAL_PATTERNS = [
    re.compile(r"^승인[\s,.!]*$", re.IGNORECASE),
    re.compile(r"승인(?:합니다|해|됐|할게|했어|해줘)", re.IGNORECASE),
    re.compile(r"(?:^|[\s,.])(?:진행|구현|적용)(?:해|해줘|합니다|하자)(?:[\s,.!]|$)", re.IGNORECASE),
    re.compile(r"\blgtm\b", re.IGNORECASE),
    re.compile(r"\bapprove[d]?\b", re.IGNORECASE),
    re.compile(r"\bproceed\b", re.IGNORECASE),
    re.compile(r"go\s+ahead", re.IGNORECASE),
]

NEGATION_PATTERN = re.compile(r"승인\s*(?:없이|전\s*에|하지\s*말|하지\s*않)", re.IGNORECASE)
PLAN_ONLY_PATTERN = re.compile(r"계획\s*만|plan\s*only|설계\s*만", re.IGNORECASE)


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def ensure_log_dir() -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)


def read_input() -> dict:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    return json.loads(raw)


def load_state() -> dict:
    ensure_log_dir()
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass
    return {
        "session_id": str(uuid.uuid4()),
        "approved": False,
        "active_role": None,
        "started_at": utc_now(),
    }


def save_state(state: dict) -> None:
    ensure_log_dir()
    STATE_FILE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


def append_log(event: str, payload: dict) -> None:
    ensure_log_dir()
    state = load_state()
    session_id = state.get("session_id", "unknown")
    day = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    log_file = LOG_DIR / f"{day}.jsonl"

    record = {
        "ts": utc_now(),
        "session_id": session_id,
        "event": event,
        **payload,
    }
    with log_file.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, ensure_ascii=False) + "\n")


def detect_role(prompt: str) -> str | None:
    lowered = prompt.lower()
    if "@planner" in lowered or " planner" in lowered:
        return "planner"
    if "@implementer" in lowered or " implementer" in lowered:
        return "implementer"
    if "@reviewer" in lowered or " reviewer" in lowered:
        return "reviewer"
    return None


def is_approved(prompt: str) -> bool:
    if NEGATION_PATTERN.search(prompt) or PLAN_ONLY_PATTERN.search(prompt):
        return False
    return any(pattern.search(prompt) for pattern in APPROVAL_PATTERNS)


def extract_prompt(data: dict) -> str:
    for key in ("prompt", "user_prompt", "text", "message", "content"):
        value = data.get(key)
        if isinstance(value, str) and value.strip():
            return value
    return ""


def handle_session_start(data: dict) -> dict:
    state = {
        "session_id": str(uuid.uuid4()),
        "approved": False,
        "active_role": None,
        "started_at": utc_now(),
    }
    save_state(state)
    append_log("sessionStart", {"input": data})
    return {}


def handle_session_end(data: dict) -> dict:
    append_log("sessionEnd", {"input": data})
    return {}


def handle_user_prompt(data: dict) -> dict:
    prompt = extract_prompt(data)
    state = load_state()
    role = detect_role(prompt)

    if role:
        state["active_role"] = role
        if role == "implementer" and is_approved(prompt):
            state["approved"] = True
        elif role in ("planner", "reviewer"):
            state["approved"] = False
    elif is_approved(prompt):
        state["approved"] = True
    elif prompt.strip():
        state["approved"] = False

    save_state(state)
    append_log(
        "beforeSubmitPrompt",
        {
            "prompt": prompt,
            "approved": state["approved"],
            "active_role": state.get("active_role"),
        },
    )
    return {}


def handle_guard(data: dict) -> dict:
    tool_name = data.get("tool_name") or data.get("tool") or data.get("name") or ""
    state = load_state()
    role = state.get("active_role")

    append_log(
        "preToolUse",
        {
            "tool": tool_name,
            "approved": state.get("approved", False),
            "active_role": role,
            "input": data.get("tool_input") or data.get("input") or data,
        },
    )

    if tool_name not in MUTATION_TOOLS:
        return {"permission": "allow"}

    if role == "reviewer":
        return {
            "permission": "deny",
            "user_message": "Reviewer 역할에서는 코드 수정이 차단됩니다.",
            "agent_message": "Reviewer는 Read/Grep만 사용하고 리뷰 텍스트만 출력하세요.",
        }

    if role == "planner":
        return {
            "permission": "deny",
            "user_message": "Planner 역할에서는 코드 수정이 차단됩니다. 승인 후 @implementer 로 구현하세요.",
            "agent_message": "Planner는 계획만 작성하세요. 파일 수정 도구를 사용하지 마세요.",
        }

    if not state.get("approved", False):
        return {
            "permission": "deny",
            "user_message": "구현 전 승인이 필요합니다. 계획 확인 후 '승인' 또는 '진행해'라고 답해 주세요.",
            "agent_message": "사용자 승인 없이 수정 도구가 차단되었습니다. 계획을 제시하고 승인을 기다리세요.",
        }

    return {"permission": "allow"}


def handle_log_tool(event: str, data: dict) -> dict:
    tool_name = data.get("tool_name") or data.get("tool") or data.get("name") or ""
    append_log(
        event,
        {
            "tool": tool_name,
            "input": data.get("tool_input") or data.get("input"),
            "output": data.get("tool_output") or data.get("output"),
            "error": data.get("error"),
        },
    )
    return {}


def handle_agent_response(data: dict) -> dict:
    append_log("afterAgentResponse", {"input": data})
    return {}


HANDLERS = {
    "session_start": handle_session_start,
    "session_end": handle_session_end,
    "user_prompt": handle_user_prompt,
    "guard": handle_guard,
    "log_post_tool": lambda data: handle_log_tool("postToolUse", data),
    "log_tool_failure": lambda data: handle_log_tool("postToolUseFailure", data),
    "agent_response": handle_agent_response,
}


def main() -> None:
    if len(sys.argv) < 2:
        print(json.dumps({"error": "missing handler name"}))
        sys.exit(1)

    handler_name = sys.argv[1]
    handler = HANDLERS.get(handler_name)

    if handler is None:
        print(json.dumps({"error": f"unknown handler: {handler_name}"}))
        sys.exit(1)

    try:
        data = read_input()
        result = handler(data)
        print(json.dumps(result, ensure_ascii=False))
    except Exception as exc:  # noqa: BLE001 — hook must not crash the agent
        append_log("hook_error", {"handler": handler_name, "error": str(exc)})
        print(json.dumps({}))
        sys.exit(0)


if __name__ == "__main__":
    main()
