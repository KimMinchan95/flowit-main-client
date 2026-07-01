import type { TaskHistoryPage } from './task-history.types';

export const DEFAULT_WORKSPACE_TASK_HISTORIES_PAGE_SIZE = 20;

export type GetWorkspaceTaskHistoriesParams = {
    workspaceId: string | number;
    taskId: number;
    page?: number;
    size?: number;
};

export type GetWorkspaceTaskHistoriesResponse = TaskHistoryPage;
