import { useCallback, useState } from 'react';

import { MAX_TASK_TAGS } from './update-task-form.constants';
import { taskDetailToUpdateTaskFormState } from './update-task-form.types';

import { isValidDateInput } from '@shared/lib/date';

import type { TaskDetail } from '@entities/task';
import type { UpdateTaskFormField, UpdateTaskFormState, UpdateTaskFormValues } from './update-task-form.types';

function normalizeTag(tag: string) {
    return tag.trim().replace(/,/g, '');
}

export function useUpdateTaskForm(task: TaskDetail) {
    const [form, setForm] = useState<UpdateTaskFormState>(() => taskDetailToUpdateTaskFormState(task));

    const updateField = useCallback(
        <TField extends UpdateTaskFormField>(field: TField, value: UpdateTaskFormValues[TField]) => {
            setForm(previous => ({ ...previous, [field]: value }));
        },
        [],
    );

    const updateDateField = useCallback((field: 'startDate' | 'dueDate', value: string) => {
        if (!isValidDateInput(value)) {
            return;
        }

        setForm(previous => ({ ...previous, [field]: value }));
    }, []);

    const setTagInput = useCallback((tagInput: string) => {
        setForm(previous => ({ ...previous, tagInput }));
    }, []);

    const addTag = useCallback(() => {
        setForm(previous => {
            const tag = normalizeTag(previous.tagInput);

            if (!tag || previous.tags.includes(tag) || previous.tags.length >= MAX_TASK_TAGS) {
                return { ...previous, tagInput: '' };
            }

            return {
                ...previous,
                tags: [...previous.tags, tag],
                tagInput: '',
            };
        });
    }, []);

    const removeTag = useCallback((tag: string) => {
        setForm(previous => ({
            ...previous,
            tags: previous.tags.filter(currentTag => currentTag !== tag),
        }));
    }, []);

    const isTagLimitReached = form.tags.length >= MAX_TASK_TAGS;

    const values: UpdateTaskFormValues = {
        title: form.title,
        descriptionMarkdown: form.descriptionMarkdown,
        status: form.status,
        assigneeMemberId: form.assigneeMemberId,
        priority: form.priority,
        startDate: form.startDate,
        dueDate: form.dueDate,
        tags: form.tags,
    };

    return {
        values,
        tagInput: form.tagInput,
        isTagLimitReached,
        updateField,
        updateDateField,
        setTagInput,
        addTag,
        removeTag,
    };
}
