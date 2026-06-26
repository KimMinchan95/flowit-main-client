import type { TaskPriority, TaskStatus } from './task.types';

export type CreateWorkspaceTaskRequest = {
    title: string;
    descriptionMarkdown?: string;
    status?: TaskStatus;
    assigneeMemberId?: number | null;
    priority: TaskPriority;
    startDate?: number;
    dueDate?: number;
    tags?: string[];
};

export type CreateWorkspaceTaskResponse = {
    createdId: number;
};
