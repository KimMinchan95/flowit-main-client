import type { CreateTaskFormState } from './create-task-form.types';

export const MAX_TASK_TAGS = 10;

export const INITIAL_CREATE_TASK_FORM_STATE: CreateTaskFormState = {
    title: '',
    descriptionMarkdown: '',
    assigneeMemberId: null,
    priority: 'MEDIUM',
    startDate: '',
    dueDate: '',
    tags: [],
    tagInput: '',
};
