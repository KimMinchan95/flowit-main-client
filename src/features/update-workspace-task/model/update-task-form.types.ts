import { MAX_TASK_TAGS } from './update-task-form.constants';

import { dateInputToEpochSeconds, epochSecondsToDateInput } from '@shared/lib/date';

import type { TaskDetail, TaskPriority, TaskStatus, UpdateWorkspaceTaskRequest } from '@entities/task';

export type UpdateTaskFormValues = {
    title: string;
    descriptionMarkdown: string;
    status: TaskStatus;
    assigneeMemberId: number | null;
    priority: TaskPriority;
    progress: number;
    startDate: string;
    dueDate: string;
    tags: string[];
};

export type UpdateTaskFormState = UpdateTaskFormValues & {
    tagInput: string;
};

export type UpdateTaskFormField = keyof UpdateTaskFormValues;

export function taskDetailToUpdateTaskFormState(task: TaskDetail): UpdateTaskFormState {
    return {
        title: task.title,
        descriptionMarkdown: task.descriptionMarkdown ?? '',
        status: task.status,
        assigneeMemberId: task.assignee?.memberId ?? null,
        priority: task.priority,
        progress: task.progress,
        startDate: epochSecondsToDateInput(task.startDate),
        dueDate: epochSecondsToDateInput(task.dueDate),
        tags: [...task.tags],
        tagInput: '',
    };
}

export function toUpdateWorkspaceTaskRequest(values: UpdateTaskFormValues): UpdateWorkspaceTaskRequest {
    const title = values.title.trim();
    const descriptionMarkdown = values.descriptionMarkdown.trim();

    return {
        title,
        descriptionMarkdown: descriptionMarkdown || undefined,
        status: values.status,
        assigneeMemberId: values.assigneeMemberId,
        priority: values.priority,
        startDate: dateInputToEpochSeconds(values.startDate),
        dueDate: dateInputToEpochSeconds(values.dueDate),
        tags: values.tags.length > 0 ? values.tags.slice(0, MAX_TASK_TAGS) : undefined,
    };
}
