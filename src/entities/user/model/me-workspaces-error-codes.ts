export const ME_WORKSPACES_ERROR_CODES = {
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type MeWorkspacesErrorCode = keyof typeof ME_WORKSPACES_ERROR_CODES;

export function isMeWorkspacesErrorCode(code: string): code is MeWorkspacesErrorCode {
    return code in ME_WORKSPACES_ERROR_CODES;
}
