export const JOIN_INVITE_CODE_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    WORKSPACE_404_001: true,
    WORKSPACE_JOIN_REQUEST_409_001: true,
    WORKSPACE_JOIN_REQUEST_409_002: true,
    INTERNAL_500_001: true,
} as const;

export type JoinInviteCodeErrorCode = keyof typeof JOIN_INVITE_CODE_ERROR_CODES;

export function isJoinInviteCodeErrorCode(code: string): code is JoinInviteCodeErrorCode {
    return code in JOIN_INVITE_CODE_ERROR_CODES;
}
