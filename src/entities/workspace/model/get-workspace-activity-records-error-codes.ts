export const GET_WORKSPACE_ACTIVITY_RECORDS_ERROR_CODES = {
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type GetWorkspaceActivityRecordsErrorCode = keyof typeof GET_WORKSPACE_ACTIVITY_RECORDS_ERROR_CODES;

export function isGetWorkspaceActivityRecordsErrorCode(code: string): code is GetWorkspaceActivityRecordsErrorCode {
    return code in GET_WORKSPACE_ACTIVITY_RECORDS_ERROR_CODES;
}
