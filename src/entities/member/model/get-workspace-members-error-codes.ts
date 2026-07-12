export const GET_WORKSPACE_MEMBERS_ERROR_CODES = {
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type GetWorkspaceMembersErrorCode = keyof typeof GET_WORKSPACE_MEMBERS_ERROR_CODES;

export function isGetWorkspaceMembersErrorCode(code: string): code is GetWorkspaceMembersErrorCode {
    return code in GET_WORKSPACE_MEMBERS_ERROR_CODES;
}
