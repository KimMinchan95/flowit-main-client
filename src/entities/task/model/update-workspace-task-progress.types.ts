export type UpdateWorkspaceTaskProgressRequest = {
    progress: number;
};

export type UpdateWorkspaceTaskProgressResponse = Record<string, never>;

export type UpdateWorkspaceTaskProgressParams = {
    taskId: number;
    progress: number;
};
