export const MAX_WORKSPACE_TASK_COMMENT_LENGTH = 1000;

export type CreateWorkspaceTaskCommentRequest = {
    contentMarkdown: string;
};

export type CreateWorkspaceTaskCommentResponse = {
    createdId: number;
};
