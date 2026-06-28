'use client';

import { useState } from 'react';

import { ScheduleInvalidRangeModal } from './schedule-invalid-range-modal';
import { Calendar, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkspaceMembersQuery } from '@entities/member';
import {
    isUpdateWorkspaceTaskErrorCode,
    isUpdateWorkspaceTaskProgressErrorCode,
    useUpdateWorkspaceTaskMutation,
    useUpdateWorkspaceTaskProgressMutation,
} from '@entities/task';

import { Button, Input, MarkdownEditor, TaskTagInput } from '@shared/ui';
import { getMappedApiErrorMessage } from '@shared/api';
import { cn } from '@shared/lib';
import { isDateRangeValid, isValidDateInput } from '@shared/lib/date';

import { MAX_TASK_TAGS, toUpdateWorkspaceTaskRequest, useUpdateTaskForm } from '../model';

import type { TaskDetail, TaskPriority, TaskStatus } from '@entities/task';
import type { FormEvent } from 'react';

const SELECT_CLASSNAME =
    'w-full cursor-pointer appearance-none rounded-lg border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const DATE_INPUT_CLASSNAME =
    'w-full cursor-pointer appearance-none rounded-lg border border-slate-200/80 bg-white py-2.5 pl-3.5 pr-10 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const PRIORITY_OPTIONS: TaskPriority[] = ['HIGH', 'MEDIUM', 'LOW'];
const STATUS_OPTIONS: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];
const STATUS_TITLE_KEY: Record<TaskStatus, 'todo' | 'inProgress' | 'done'> = {
    TODO: 'todo',
    IN_PROGRESS: 'inProgress',
    DONE: 'done',
};

function clampProgress(value: number) {
    return Math.min(100, Math.max(0, Math.round(value)));
}

type UpdateTaskFormProps = {
    workspaceId: string;
    task: TaskDetail;
    onClose: () => void;
};

export function UpdateTaskForm({ workspaceId, task, onClose }: UpdateTaskFormProps) {
    const t = useTranslations('board.updateTaskModal');
    const tBoard = useTranslations('board');
    const tColumns = useTranslations('board.columns');
    const tCommon = useTranslations('common');
    const tErrors = useTranslations('board.updateTaskErrors');
    const tProgressErrors = useTranslations('board.updateTaskProgressErrors');

    const { values, tagInput, isTagLimitReached, updateField, updateDateField, setTagInput, addTag, removeTag } =
        useUpdateTaskForm(task);
    const [isScheduleInvalidRangeOpen, setIsScheduleInvalidRangeOpen] = useState(false);
    const [isProgressUpdateFailed, setIsProgressUpdateFailed] = useState(false);
    const { data: membersData } = useWorkspaceMembersQuery({ workspaceId, enabled: !!workspaceId });
    const {
        mutateAsync: updateTaskAsync,
        isPending: isUpdatePending,
        error: updateError,
        reset: resetUpdate,
    } = useUpdateWorkspaceTaskMutation({ workspaceId });
    const {
        mutateAsync: updateProgressAsync,
        isPending: isProgressPending,
        error: progressError,
        reset: resetProgress,
    } = useUpdateWorkspaceTaskProgressMutation({ workspaceId });

    const isPending = isUpdatePending || isProgressPending;
    const isFormLocked = isProgressUpdateFailed;

    const activeMembers = membersData?.members.filter(member => member.status === 'ACTIVE') ?? [];

    const submitErrorMessage = updateError
        ? getMappedApiErrorMessage({
              error: updateError,
              fallback: tBoard('updateTaskFailed'),
              unknownError: tBoard('updateTaskUnknownError'),
              isKnownErrorCode: isUpdateWorkspaceTaskErrorCode,
              getKnownErrorMessage: errorCode => tErrors(errorCode),
          })
        : null;

    const progressErrorMessage = progressError
        ? getMappedApiErrorMessage({
              error: progressError,
              fallback: tBoard('updateTaskProgressFailed'),
              unknownError: tBoard('updateTaskUnknownError'),
              isKnownErrorCode: isUpdateWorkspaceTaskProgressErrorCode,
              getKnownErrorMessage: errorCode => tProgressErrors(errorCode),
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isDateRangeValid(values.startDate, values.dueDate)) {
            setIsScheduleInvalidRangeOpen(true);
            return;
        }

        resetUpdate();
        resetProgress();
        setIsProgressUpdateFailed(false);

        try {
            await updateTaskAsync({
                taskId: task.id,
                body: toUpdateWorkspaceTaskRequest(values),
            });

            if (values.progress !== task.progress) {
                try {
                    await updateProgressAsync({ taskId: task.id, progress: values.progress });
                } catch {
                    setIsProgressUpdateFailed(true);
                    return;
                }
            }

            onClose();
        } catch {
            // surfaced via mutation state
        }
    };

    const handleCloseAfterPartialSuccess = () => {
        resetUpdate();
        resetProgress();
        onClose();
    };

    const getFeedbackMessage = () => {
        if (isProgressUpdateFailed) {
            return <p className="mt-6 text-sm font-bold text-amber-600">{tBoard('updateTaskProgressFailed')}</p>;
        }

        if (submitErrorMessage) {
            return <p className="mt-6 text-sm font-bold text-rose-500">{submitErrorMessage}</p>;
        }

        if (progressErrorMessage) {
            return <p className="mt-6 text-sm font-bold text-rose-500">{progressErrorMessage}</p>;
        }

        return null;
    };

    const feedbackMessage = getFeedbackMessage();

    const footerActions = isProgressUpdateFailed ? (
        <Button type="button" variant="primary" size="sm" onClick={handleCloseAfterPartialSuccess}>
            {t('scheduleInvalidRangeConfirm')}
        </Button>
    ) : (
        <>
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
        </>
    );

    return (
        <>
            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
                <div className="min-h-0 flex-1 overflow-y-auto py-3 lg:overflow-hidden">
                    <div className="grid grid-cols-1 gap-8 lg:h-full lg:min-h-0 lg:grid-cols-[1fr_320px]">
                        <div className="flex flex-col space-y-6 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
                            <div>
                                <label
                                    htmlFor="update-task-title"
                                    className="mb-2 block text-sm font-bold text-slate-800"
                                >
                                    {t('titleLabel')} <span className="text-rose-500">*</span>
                                </label>
                                <Input
                                    id="update-task-title"
                                    type="text"
                                    value={values.title}
                                    onChange={event => updateField('title', event.target.value)}
                                    className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900"
                                    placeholder={t('titlePlaceholder')}
                                    required
                                    disabled={isFormLocked}
                                />
                            </div>

                            <div className="flex flex-1 flex-col">
                                <label
                                    htmlFor="update-task-description"
                                    className="mb-2 block text-sm font-bold text-slate-800"
                                >
                                    {t('descriptionLabel')}
                                </label>
                                <MarkdownEditor
                                    value={values.descriptionMarkdown}
                                    onChange={value => updateField('descriptionMarkdown', value)}
                                    placeholder={t('descriptionPlaceholder')}
                                    writeLabel={t('markdownWrite')}
                                    previewLabel={t('markdownPreview')}
                                    emptyPreviewLabel={t('markdownPreviewEmpty')}
                                    expandLabel={t('markdownExpand')}
                                    expandedTitle={t('markdownExpandedTitle')}
                                />
                            </div>
                        </div>

                        <div className="h-fit space-y-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 lg:min-h-0 lg:overflow-y-auto">
                            <div>
                                <label
                                    htmlFor="update-task-status"
                                    className="mb-2 block text-sm font-bold text-slate-800"
                                >
                                    {t('statusLabel')}
                                </label>
                                <select
                                    id="update-task-status"
                                    value={values.status}
                                    onChange={event => updateField('status', event.target.value as TaskStatus)}
                                    className={SELECT_CLASSNAME}
                                    disabled={isFormLocked}
                                >
                                    {STATUS_OPTIONS.map(status => (
                                        <option key={status} value={status}>
                                            {tColumns(STATUS_TITLE_KEY[status])}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="update-task-assignee"
                                    className="mb-2 block text-sm font-bold text-slate-800"
                                >
                                    {t('assigneeLabel')}
                                </label>
                                <select
                                    id="update-task-assignee"
                                    value={values.assigneeMemberId ?? ''}
                                    onChange={event => {
                                        const value = event.target.value;
                                        updateField('assigneeMemberId', value ? Number(value) : null);
                                    }}
                                    className={SELECT_CLASSNAME}
                                    disabled={isFormLocked}
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
                                <label
                                    htmlFor="update-task-priority"
                                    className="mb-2 block text-sm font-bold text-slate-800"
                                >
                                    {t('priorityLabel')} <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    id="update-task-priority"
                                    value={values.priority}
                                    onChange={event => updateField('priority', event.target.value as TaskPriority)}
                                    className={SELECT_CLASSNAME}
                                    required
                                    disabled={isFormLocked}
                                >
                                    {PRIORITY_OPTIONS.map(priority => (
                                        <option key={priority} value={priority}>
                                            {t(`priority.${priority}`)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="update-task-progress"
                                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800"
                                >
                                    <p>{t('progressLabel')}</p>
                                    <span className="text-xs font-semibold text-slate-400">
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={values.progress}
                                            onChange={event => {
                                                const nextProgress = Number(event.target.value);

                                                if (!Number.isNaN(nextProgress)) {
                                                    updateField('progress', clampProgress(nextProgress));
                                                }
                                            }}
                                            onBlur={event => {
                                                const nextProgress = Number(event.target.value);

                                                if (!Number.isNaN(nextProgress)) {
                                                    updateField('progress', clampProgress(nextProgress));
                                                }
                                            }}
                                            disabled={isFormLocked}
                                            className={cn(
                                                'w-15 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-center text-xs font-extrabold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60',
                                                values.progress === 100 ? 'text-blue-600' : 'text-slate-700',
                                            )}
                                            aria-label={t('progressInputLabel')}
                                        />
                                        <span
                                            className={cn(
                                                'text-xs font-extrabold',
                                                values.progress === 100 ? 'text-blue-600' : 'text-slate-700',
                                            )}
                                        >
                                            %
                                        </span>
                                    </span>
                                </label>
                                <input
                                    id="update-task-progress"
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={values.progress}
                                    onChange={event => updateField('progress', Number(event.target.value))}
                                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={isFormLocked}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={values.progress}
                                />
                            </div>

                            <div>
                                <span className="mb-2 block text-sm font-bold text-slate-800">
                                    {t('scheduleLabel')}
                                </span>
                                <div className="space-y-2.5">
                                    <div className="relative">
                                        <Calendar className="absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="date"
                                            value={values.startDate}
                                            onChange={event => handleDateFieldChange('startDate', event.target.value)}
                                            className={DATE_INPUT_CLASSNAME}
                                            aria-label={t('startDateLabel')}
                                            disabled={isFormLocked}
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
                                            disabled={isFormLocked}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="update-task-tags"
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
                                    disabled={isFormLocked}
                                />
                                <p className="mt-1.5 text-xs font-medium text-slate-400">
                                    {t('tagsHelper', { max: MAX_TASK_TAGS })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {feedbackMessage}
                </div>

                <div className="flex shrink-0 justify-end gap-3 border-t border-slate-100 bg-white pt-4">
                    {footerActions}
                </div>
            </form>
            <ScheduleInvalidRangeModal
                open={isScheduleInvalidRangeOpen}
                onClose={() => setIsScheduleInvalidRangeOpen(false)}
            />
        </>
    );
}
