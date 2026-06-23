import { MAX_TASK_TAGS } from './create-task-form.constants';

import { dateInputToEpochSeconds } from '@shared/lib/date';

import type { CreateWorkspaceTaskRequest, TaskPriority, TaskStatus } from '@entities/task';

export type CreateTaskFormValues = {
    title: string;
    descriptionMarkdown: string;
    assigneeMemberId: number | null;
    priority: TaskPriority;
    progress: number;
    startDate: string;
    dueDate: string;
    tags: string[];
};

export type CreateTaskFormState = CreateTaskFormValues & {
    tagInput: string;
};

export type CreateTaskFormField = keyof CreateTaskFormValues;

export function toCreateWorkspaceTaskRequest(
    values: CreateTaskFormValues,
    status: TaskStatus,
): CreateWorkspaceTaskRequest {
    const title = values.title.trim();
    const descriptionMarkdown = values.descriptionMarkdown.trim();

    return {
        title,
        descriptionMarkdown: descriptionMarkdown || undefined,
        status,
        assigneeMemberId: values.assigneeMemberId,
        priority: values.priority,
        startDate: dateInputToEpochSeconds(values.startDate),
        dueDate: dateInputToEpochSeconds(values.dueDate),
        tags: values.tags.length > 0 ? values.tags.slice(0, MAX_TASK_TAGS) : undefined,
    };
}
