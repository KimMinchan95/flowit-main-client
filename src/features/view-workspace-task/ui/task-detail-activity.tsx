'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MemberAvatar, useWorkspaceMemberNameMap } from '@entities/member';
import { isGetWorkspaceTaskHistoriesErrorCode, useWorkspaceTaskHistoriesQuery } from '@entities/task';

import { getMappedApiErrorMessage } from '@shared/api';
import { formatRelativeEpochSeconds } from '@shared/lib/date';

import { formatTaskHistoryMessage } from '../lib/format-task-history-message';

import type { GetWorkspaceTaskHistoriesErrorCode, TaskHistoryItem } from '@entities/task';

const HISTORY_CHANGE_ELEMENTS = [
    'STATUS',
    'ASSIGNEE',
    'PRIORITY',
    'TITLE',
    'DESCRIPTION',
    'PROGRESS',
    'START_DATE',
    'DUE_DATE',
    'TAGS',
] as const;

type TaskDetailActivityProps = {
    workspaceId: string | number;
    taskId: number;
};

export function TaskDetailActivity({ workspaceId, taskId }: TaskDetailActivityProps) {
    const t = useTranslations('board.taskDetail');
    const tBoard = useTranslations('board');
    const tHistory = useTranslations('board.taskHistory');
    const tColumns = useTranslations('board.columns');
    const tErrors = useTranslations('board.taskHistoryErrors');

    const memberNameByMemberId = useWorkspaceMemberNameMap({ workspaceId });
    const { data: historyPage, isPending, isError, error } = useWorkspaceTaskHistoriesQuery({ workspaceId, taskId });

    const histories = historyPage?.items ?? [];
    const totalCount = historyPage?.totalCount ?? 0;

    const errorMessage = isError
        ? getMappedApiErrorMessage({
              error,
              fallback: t('activityLoadFailed'),
              unknownError: tBoard('createCommentUnknownError'),
              isKnownErrorCode: isGetWorkspaceTaskHistoriesErrorCode,
              getKnownErrorMessage: (errorCode: GetWorkspaceTaskHistoriesErrorCode) => tErrors(errorCode),
          })
        : null;

    const formatters = {
        formatCreated: (actor: string) => tHistory('created', { actor }),
        formatChange: ({ actor, element, from, to }: { actor: string; element: string; from: string; to: string }) => {
            if (HISTORY_CHANGE_ELEMENTS.includes(element as (typeof HISTORY_CHANGE_ELEMENTS)[number])) {
                return tHistory(`change.${element}` as `change.${(typeof HISTORY_CHANGE_ELEMENTS)[number]}`, {
                    actor,
                    from,
                    to,
                });
            }

            return tHistory('change.fallback', { actor, element, from, to });
        },
        formatActionFallback: ({ actor, action }: { actor: string; action: string }) =>
            tHistory('actionFallback', { actor, action }),
        formatStatus: (status: string) => {
            if (status === 'TODO') {
                return tColumns('todo');
            }

            if (status === 'IN_PROGRESS') {
                return tColumns('inProgress');
            }

            if (status === 'DONE') {
                return tColumns('done');
            }

            return status;
        },
        formatPriority: (priority: string) => {
            if (priority === 'HIGH' || priority === 'MEDIUM' || priority === 'LOW') {
                return tBoard(`taskPriority.${priority}`);
            }

            return priority;
        },
        formatEmpty: () => tHistory('empty'),
        formatUnassigned: () => tHistory('unassigned'),
    };

    const activityMessages = histories.map((item: TaskHistoryItem) => ({
        item,
        messages: formatTaskHistoryMessage({
            item,
            memberNameByMemberId,
            ...formatters,
        }),
    }));

    if (isPending) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="size-5 animate-spin text-slate-400" />
            </div>
        );
    }

    if (errorMessage) {
        return <p className="py-8 text-center text-sm font-medium text-rose-500">{errorMessage}</p>;
    }

    if (activityMessages.length === 0) {
        return <p className="py-8 text-center text-sm font-medium text-slate-400">{t('noActivity')}</p>;
    }

    return (
        <div className="relative space-y-7 pb-8 pl-2">
            <div className="absolute top-6 bottom-4 left-[23px] w-px bg-slate-100" />
            {activityMessages.map(({ item, messages }) => (
                <div key={item.id} className="relative flex gap-4">
                    <MemberAvatar
                        name={item.actor.displayName}
                        workspaceId={workspaceId}
                        memberId={item.actor.memberId}
                        size="md"
                    />
                    <div className="pt-1.5">
                        <div className="space-y-0.5 text-[14px] leading-snug font-medium text-slate-700">
                            {messages.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                            {formatRelativeEpochSeconds(item.occurredAt, {
                                justNow: t('relativeTime.justNow'),
                                minutesAgo: count => t('relativeTime.minutesAgo', { count }),
                                hoursAgo: count => t('relativeTime.hoursAgo', { count }),
                                daysAgo: count => t('relativeTime.daysAgo', { count }),
                            })}
                        </p>
                    </div>
                </div>
            ))}
            {totalCount > histories.length ? (
                <p className="text-center text-xs font-medium text-slate-400">
                    {t('activityTruncated', { shown: histories.length, total: totalCount })}
                </p>
            ) : null}
        </div>
    );
}
