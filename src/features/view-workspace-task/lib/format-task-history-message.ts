import { formatEpochSeconds } from '@shared/lib/date';

import type { TaskHistoryChange, TaskHistoryItem, TaskPriority, TaskStatus } from '@entities/task';

const TASK_STATUS_VALUES: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];
const TASK_PRIORITY_VALUES: TaskPriority[] = ['HIGH', 'MEDIUM', 'LOW'];

type FormatTaskHistoryMessageParams = {
    item: TaskHistoryItem;
    memberNameByMemberId: Map<number, string>;
    formatCreated: (actor: string) => string;
    formatChange: (params: { actor: string; element: string; from: string; to: string }) => string;
    formatActionFallback: (params: { actor: string; action: string }) => string;
    formatStatus: (status: string) => string;
    formatPriority: (priority: string) => string;
    formatEmpty: () => string;
    formatUnassigned: () => string;
};

type FormatHistoryValueContext = {
    memberNameByMemberId: Map<number, string>;
    formatStatus: (status: string) => string;
    formatPriority: (priority: string) => string;
    formatEmpty: () => string;
    formatUnassigned: () => string;
};

function isTaskStatus(value: unknown): value is TaskStatus {
    return typeof value === 'string' && TASK_STATUS_VALUES.includes(value as TaskStatus);
}

function isTaskPriority(value: unknown): value is TaskPriority {
    return typeof value === 'string' && TASK_PRIORITY_VALUES.includes(value as TaskPriority);
}

function formatTagsValue(value: unknown): string {
    if (!Array.isArray(value)) {
        return String(value ?? '');
    }

    return value.map(tag => String(tag)).join(', ');
}

function formatEmptyHistoryValue(
    element: string,
    { formatEmpty, formatUnassigned }: Pick<FormatHistoryValueContext, 'formatEmpty' | 'formatUnassigned'>,
): string {
    if (element === 'ASSIGNEE') {
        return formatUnassigned();
    }

    return formatEmpty();
}

function formatElementSpecificValue(
    element: string,
    value: unknown,
    { memberNameByMemberId, formatStatus, formatPriority }: FormatHistoryValueContext,
): string | null {
    if (element === 'STATUS' && isTaskStatus(value)) {
        return formatStatus(value);
    }

    if (element === 'PRIORITY' && isTaskPriority(value)) {
        return formatPriority(value);
    }

    if ((element === 'START_DATE' || element === 'DUE_DATE') && typeof value === 'number') {
        return formatEpochSeconds(value, 'YYYY.MM.DD');
    }

    if (element === 'PROGRESS' && typeof value === 'number') {
        return `${value}%`;
    }

    if (element === 'ASSIGNEE' && typeof value === 'number') {
        return memberNameByMemberId.get(value) ?? String(value);
    }

    if (element === 'TAGS') {
        return formatTagsValue(value);
    }

    return null;
}

function formatHistoryValue(element: string, value: unknown, context: FormatHistoryValueContext): string {
    if (value === null || value === undefined || value === '') {
        return formatEmptyHistoryValue(element, context);
    }

    const elementValue = formatElementSpecificValue(element, value, context);

    if (elementValue !== null) {
        return elementValue;
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    return JSON.stringify(value);
}

function formatHistoryChange(
    change: TaskHistoryChange,
    actor: string,
    memberNameByMemberId: Map<number, string>,
    params: Omit<FormatTaskHistoryMessageParams, 'item'>,
): string {
    const context: FormatHistoryValueContext = {
        memberNameByMemberId,
        formatStatus: params.formatStatus,
        formatPriority: params.formatPriority,
        formatEmpty: params.formatEmpty,
        formatUnassigned: params.formatUnassigned,
    };
    const from = formatHistoryValue(change.element, change.from, context);
    const to = formatHistoryValue(change.element, change.to, context);

    return params.formatChange({
        actor,
        element: change.element,
        from,
        to,
    });
}

export function formatTaskHistoryMessage({
    item,
    memberNameByMemberId,
    formatCreated,
    formatChange,
    formatActionFallback,
    formatStatus,
    formatPriority,
    formatEmpty,
    formatUnassigned,
}: FormatTaskHistoryMessageParams): string[] {
    const actor = item.actor.displayName;

    if (item.action === 'CREATED') {
        return [formatCreated(actor)];
    }

    if (item.changes.length > 0) {
        return item.changes.map(change =>
            formatHistoryChange(change, actor, memberNameByMemberId, {
                memberNameByMemberId,
                formatCreated,
                formatChange,
                formatActionFallback,
                formatStatus,
                formatPriority,
                formatEmpty,
                formatUnassigned,
            }),
        );
    }

    return [formatActionFallback({ actor, action: item.action })];
}
