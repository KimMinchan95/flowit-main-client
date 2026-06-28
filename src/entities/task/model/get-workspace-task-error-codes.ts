export const GET_WORKSPACE_TASK_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    TASK_404_001: 'Task does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type GetWorkspaceTaskErrorCode = keyof typeof GET_WORKSPACE_TASK_ERROR_CODES;

export function isGetWorkspaceTaskErrorCode(code: string): code is GetWorkspaceTaskErrorCode {
    return code in GET_WORKSPACE_TASK_ERROR_CODES;
}
