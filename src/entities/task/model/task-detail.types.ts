import type { TaskAssignee, TaskPriority, TaskStatus } from './task.types';

export type TaskCommentAuthor = {
    memberId: number;
    displayName: string;
};

export type TaskComment = {
    id: number;
    taskId: number;
    author: TaskCommentAuthor;
    contentMarkdown: string;
    edited: boolean;
    editable: boolean;
    ownedByRequester: boolean;
    createdAt: number;
    updatedAt: number;
};

export type TaskCommentPage = {
    items: TaskComment[];
    totalCount: number;
};

export type TaskDetail = {
    id: number;
    workspaceId: number;
    title: string;
    descriptionMarkdown: string | null;
    status: TaskStatus;
    assignee: TaskAssignee | null;
    priority: TaskPriority;
    startDate: number | null;
    dueDate: number | null;
    tags: string[];
    progress: number;
    createdByUserId: number;
    createdAt: number;
    updatedAt: number;
    commentPage: TaskCommentPage;
};
