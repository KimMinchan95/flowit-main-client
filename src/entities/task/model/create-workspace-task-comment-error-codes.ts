export const CREATE_WORKSPACE_TASK_COMMENT_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    TASK_404_001: 'Task does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type CreateWorkspaceTaskCommentErrorCode = keyof typeof CREATE_WORKSPACE_TASK_COMMENT_ERROR_CODES;

export function isCreateWorkspaceTaskCommentErrorCode(code: string): code is CreateWorkspaceTaskCommentErrorCode {
    return code in CREATE_WORKSPACE_TASK_COMMENT_ERROR_CODES;
}
