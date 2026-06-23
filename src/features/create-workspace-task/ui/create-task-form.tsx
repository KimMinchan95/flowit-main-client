'use client';

import { useState } from 'react';

import { ScheduleInvalidRangeModal } from './schedule-invalid-range-modal';
import { TaskTagInput } from './task-tag-input';
import { Calendar, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkspaceMembersQuery } from '@entities/member';
import { isCreateWorkspaceTaskErrorCode, useCreateWorkspaceTaskMutation } from '@entities/task';

import { Button, Input, MarkdownEditor } from '@shared/ui';
import { getMappedApiErrorMessage } from '@shared/api';
import { isDateRangeValid, isValidDateInput } from '@shared/lib/date';

import { MAX_TASK_TAGS, toCreateWorkspaceTaskRequest, useCreateTaskForm } from '../model';

import type { TaskPriority, TaskStatus } from '@entities/task';
import type { FormEvent } from 'react';

const SELECT_CLASSNAME =
    'w-full cursor-pointer appearance-none rounded-lg border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const DATE_INPUT_CLASSNAME =
    'w-full cursor-pointer appearance-none rounded-lg border border-slate-200/80 bg-white py-2.5 pl-3.5 pr-10 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const PRIORITY_OPTIONS: TaskPriority[] = ['HIGH', 'MEDIUM', 'LOW'];

type CreateTaskFormProps = {
    workspaceId: string;
    initialStatus: TaskStatus;
    onClose: () => void;
};

export function CreateTaskForm({ workspaceId, initialStatus, onClose }: CreateTaskFormProps) {
    const t = useTranslations('board.createTaskModal');
    const tBoard = useTranslations('board');
    const tCommon = useTranslations('common');
    const tErrors = useTranslations('board.createTaskErrors');

    const { values, tagInput, isTagLimitReached, updateField, updateDateField, setTagInput, addTag, removeTag } =
        useCreateTaskForm();
    const [isScheduleInvalidRangeOpen, setIsScheduleInvalidRangeOpen] = useState(false);
    const { data: membersData } = useWorkspaceMembersQuery({ workspaceId, enabled: !!workspaceId });
    const { mutate: createTask, isPending, error, reset } = useCreateWorkspaceTaskMutation({ workspaceId });

    const activeMembers = membersData?.members.filter(member => member.status === 'ACTIVE') ?? [];

    const submitErrorMessage = error
        ? getMappedApiErrorMessage({
              error,
              fallback: tBoard('createTaskFailed'),
              unknownError: tBoard('createTaskUnknownError'),
              isKnownErrorCode: isCreateWorkspaceTaskErrorCode,
              getKnownErrorMessage: errorCode => tErrors(errorCode),
          })
        : null;

    const handleDateFieldChange = (field: 'startDate' | 'dueDate', value: string) => {
        if (!isValidDateInput(value)) {
            return;
        }

        const startDate = field === 'startDate' ? value : values.startDate;
        const dueDate = field === 'dueDate' ? value : values.dueDate;

        if (!isDateRangeValid(startDate, dueDate)) {
            setIsScheduleInvalidRangeOpen(true);
            return;
        }

        updateDateField(field, value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isDateRangeValid(values.startDate, values.dueDate)) {
            setIsScheduleInvalidRangeOpen(true);
            return;
        }

        createTask(toCreateWorkspaceTaskRequest(values, initialStatus), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label htmlFor="task-title" className="mb-2 block text-sm font-bold text-slate-800">
                                {t('titleLabel')} <span className="text-rose-500">*</span>
                            </label>
                            <Input
                                id="task-title"
                                type="text"
                                value={values.title}
                                onChange={event => updateField('title', event.target.value)}
                                className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900"
                                placeholder={t('titlePlaceholder')}
                                required
                            />
                        </div>

                        <div className="flex flex-1 flex-col">
                            <label htmlFor="task-description" className="mb-2 block text-sm font-bold text-slate-800">
                                {t('descriptionLabel')}
                            </label>
                            <MarkdownEditor
                                value={values.descriptionMarkdown}
                                onChange={value => updateField('descriptionMarkdown', value)}
                                placeholder={t('descriptionPlaceholder')}
                                writeLabel={t('markdownWrite')}
                                previewLabel={t('markdownPreview')}
                                emptyPreviewLabel={t('markdownPreviewEmpty')}
                            />
                        </div>
                    </div>

                    <div className="h-fit space-y-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                        <div>
                            <label htmlFor="task-assignee" className="mb-2 block text-sm font-bold text-slate-800">
                                {t('assigneeLabel')}
                            </label>
                            <select
                                id="task-assignee"
                                value={values.assigneeMemberId ?? ''}
                                onChange={event => {
                                    const value = event.target.value;

                                    updateField('assigneeMemberId', value ? Number(value) : null);
                                }}
                                className={SELECT_CLASSNAME}
                            >
                                <option value="">{t('assigneePlaceholder')}</option>
                                {activeMembers.map(member => (
                                    <option key={member.memberId} value={member.memberId}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="task-priority" className="mb-2 block text-sm font-bold text-slate-800">
                                {t('priorityLabel')} <span className="text-rose-500">*</span>
                            </label>
                            <select
                                id="task-priority"
                                value={values.priority}
                                onChange={event => updateField('priority', event.target.value as TaskPriority)}
                                className={SELECT_CLASSNAME}
                                required
                            >
                                {PRIORITY_OPTIONS.map(priority => (
                                    <option key={priority} value={priority}>
                                        {t(`priority.${priority}`)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <span className="mb-2 block text-sm font-bold text-slate-800">{t('scheduleLabel')}</span>
                            <div className="space-y-2.5">
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="date"
                                        value={values.startDate}
                                        onChange={event => handleDateFieldChange('startDate', event.target.value)}
                                        className={DATE_INPUT_CLASSNAME}
                                        aria-label={t('startDateLabel')}
                                    />
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="date"
                                        value={values.dueDate}
                                        onChange={event => handleDateFieldChange('dueDate', event.target.value)}
                                        className={DATE_INPUT_CLASSNAME}
                                        aria-label={t('dueDateLabel')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="task-tags"
                                className="mb-2 flex items-center justify-between text-sm font-bold text-slate-800"
                            >
                                <span>{t('tagsLabel')}</span>
                                <span className="text-xs font-semibold text-slate-400">
                                    {t('tagsCount', { count: values.tags.length, max: MAX_TASK_TAGS })}
                                </span>
                            </label>
                            <TaskTagInput
                                tags={values.tags}
                                tagInput={tagInput}
                                maxTags={MAX_TASK_TAGS}
                                placeholder={isTagLimitReached ? t('tagsLimitReached') : t('tagsPlaceholder')}
                                onTagInputChange={setTagInput}
                                onAddTag={addTag}
                                onRemoveTag={removeTag}
                            />
                            <p className="mt-1.5 text-xs font-medium text-slate-400">
                                {t('tagsHelper', { max: MAX_TASK_TAGS })}
                            </p>
                        </div>
                    </div>
                </div>

                {submitErrorMessage ? (
                    <p className="mt-6 text-sm font-bold text-rose-500">{submitErrorMessage}</p>
                ) : null}

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
                    <Button type="button" variant="neutral" size="sm" onClick={onClose} disabled={isPending}>
                        {tCommon('cancel')}
                    </Button>
                    <Button type="submit" variant="primary" size="sm" disabled={isPending} className="min-w-[120px]">
                        {isPending ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                {t('submitting')}
                            </span>
                        ) : (
                            t('submit')
                        )}
                    </Button>
                </div>
            </form>
            <ScheduleInvalidRangeModal
                open={isScheduleInvalidRangeOpen}
                onClose={() => setIsScheduleInvalidRangeOpen(false)}
            />
        </>
    );
}
