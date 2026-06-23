import type { CreateTaskFormState } from './create-task-form.types';

export const MAX_TASK_TAGS = 10;

export const INITIAL_CREATE_TASK_FORM_STATE: CreateTaskFormState = {
    title: '',
    descriptionMarkdown: '',
    assigneeMemberId: null,
    priority: 'MEDIUM',
    progress: 0,
    startDate: '',
    dueDate: '',
    tags: [],
    tagInput: '',
};
