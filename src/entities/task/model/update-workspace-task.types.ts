import type { TaskPriority, TaskStatus } from './task.types';

export type UpdateWorkspaceTaskRequest = {
    title: string;
    descriptionMarkdown?: string;
    status?: TaskStatus;
    assigneeMemberId?: number | null;
    priority: TaskPriority;
    startDate?: number | null;
    dueDate?: number | null;
    tags?: string[];
};

export type UpdateWorkspaceTaskResponse = Record<string, never>;

export type UpdateWorkspaceTaskParams = {
    taskId: number;
    body: UpdateWorkspaceTaskRequest;
};
