export const GET_WORKSPACE_TASKS_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type GetWorkspaceTasksErrorCode = keyof typeof GET_WORKSPACE_TASKS_ERROR_CODES;

export function isGetWorkspaceTasksErrorCode(code: string): code is GetWorkspaceTasksErrorCode {
    return code in GET_WORKSPACE_TASKS_ERROR_CODES;
}
