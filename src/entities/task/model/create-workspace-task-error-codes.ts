export const CREATE_WORKSPACE_TASK_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    WORKSPACE_MEMBER_404_001: 'Assignee member does not exist or has been removed',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type CreateWorkspaceTaskErrorCode = keyof typeof CREATE_WORKSPACE_TASK_ERROR_CODES;

export function isCreateWorkspaceTaskErrorCode(code: string): code is CreateWorkspaceTaskErrorCode {
    return code in CREATE_WORKSPACE_TASK_ERROR_CODES;
}
