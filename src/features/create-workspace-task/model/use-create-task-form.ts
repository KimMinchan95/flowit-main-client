import { useCallback, useState } from 'react';

import { INITIAL_CREATE_TASK_FORM_STATE, MAX_TASK_TAGS } from './create-task-form.constants';

import { isValidDateInput } from '@shared/lib/date';

import type { CreateTaskFormField, CreateTaskFormState, CreateTaskFormValues } from './create-task-form.types';

function normalizeTag(tag: string) {
    return tag.trim().replace(/,/g, '');
}

export function useCreateTaskForm() {
    const [form, setForm] = useState<CreateTaskFormState>({ ...INITIAL_CREATE_TASK_FORM_STATE });

    const updateField = useCallback(
        <TField extends CreateTaskFormField>(field: TField, value: CreateTaskFormValues[TField]) => {
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

    const values: CreateTaskFormValues = {
        title: form.title,
        descriptionMarkdown: form.descriptionMarkdown,
        assigneeMemberId: form.assigneeMemberId,
        priority: form.priority,
        progress: form.progress,
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
