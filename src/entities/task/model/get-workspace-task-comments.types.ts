import type { TaskCommentPage } from './task-detail.types';

export const DEFAULT_WORKSPACE_TASK_COMMENTS_PAGE_SIZE = 20;

export type GetWorkspaceTaskCommentsParams = {
    workspaceId: string | number;
    taskId: number;
    page?: number;
    size?: number;
};

export type GetWorkspaceTaskCommentsResponse = TaskCommentPage;
