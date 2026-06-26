import type { TaskStatus } from './task.types';

export type UpdateWorkspaceTaskStatusRequest = {
    status: TaskStatus;
};

export type UpdateWorkspaceTaskStatusResponse = Record<string, never>;

export type UpdateWorkspaceTaskStatusParams = {
    taskId: number;
    status: TaskStatus;
};
