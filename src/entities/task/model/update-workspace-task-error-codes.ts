export const UPDATE_WORKSPACE_TASK_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    WORKSPACE_MEMBER_404_001: 'Target workspace member does not exist or has been removed',
    TASK_404_001: 'Task does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type UpdateWorkspaceTaskErrorCode = keyof typeof UPDATE_WORKSPACE_TASK_ERROR_CODES;

export function isUpdateWorkspaceTaskErrorCode(code: string): code is UpdateWorkspaceTaskErrorCode {
    return code in UPDATE_WORKSPACE_TASK_ERROR_CODES;
}
