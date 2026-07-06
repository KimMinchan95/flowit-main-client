export type UpdateWorkspaceTaskCommentRequest = {
    contentMarkdown: string;
};

export type UpdateWorkspaceTaskCommentResponse = Record<string, never>;

export type UpdateWorkspaceTaskCommentParams = {
    commentId: number;
    body: UpdateWorkspaceTaskCommentRequest;
};
