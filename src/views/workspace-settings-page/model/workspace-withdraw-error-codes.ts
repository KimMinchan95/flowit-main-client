export const WORKSPACE_WITHDRAW_ERROR_CODES = {
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type WorkspaceWithdrawErrorCode = keyof typeof WORKSPACE_WITHDRAW_ERROR_CODES;

export function isWorkspaceWithdrawErrorCode(code: string): code is WorkspaceWithdrawErrorCode {
    return code in WORKSPACE_WITHDRAW_ERROR_CODES;
}
