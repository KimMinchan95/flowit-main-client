'use client';

import { BoardHeader } from './board-header';
import { KanbanBoard } from './kanban-board';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { taskQueryKeys, useWorkspaceTasksQuery } from '@entities/task';
import { useWorkspaceQuery } from '@entities/workspace';

import type { Task } from '@entities/task';

const BOARD_TASKS_PAGE_SIZE = 100;
const BOARD_TASKS_QUERY_PARAMS = { page: 0, size: BOARD_TASKS_PAGE_SIZE } as const;

type Props = {
    workspaceId: string;
};

export function WorkspaceBoardPage({ workspaceId }: Props) {
    const t = useTranslations('board');
    const queryClient = useQueryClient();
    const { data: workspace, isPending: isWorkspacePending } = useWorkspaceQuery({ workspaceId });
    const {
        data: tasksData,
        isPending: isTasksPending,
        isError: isTasksError,
    } = useWorkspaceTasksQuery({
        workspaceId,
        params: BOARD_TASKS_QUERY_PARAMS,
        enabled: !!workspaceId,
    });

    const workspaceName = workspace?.name ?? (isWorkspacePending ? '…' : '');
    const tasksQueryKey = taskQueryKeys.list({ workspaceId, ...BOARD_TASKS_QUERY_PARAMS });

    const handleTasksChange = (updatedTasks: Task[]) => {
        queryClient.setQueryData(tasksQueryKey, previous =>
            previous ? { ...previous, items: updatedTasks } : previous,
        );
    };

    if (isTasksPending) {
        return (
            <div className="flex min-h-full flex-col p-8">
                <BoardHeader workspaceId={workspaceId} workspaceName={workspaceName} />
                <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-slate-400" />
                </div>
            </div>
        );
    }

    if (isTasksError) {
        return (
            <div className="flex min-h-full flex-col p-8">
                <BoardHeader workspaceId={workspaceId} workspaceName={workspaceName} />
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200/80 bg-white py-16 text-sm font-medium text-rose-500 shadow-sm">
                    {t('loadFailed')}
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-full flex-col p-8">
            <BoardHeader workspaceId={workspaceId} workspaceName={workspaceName} />
            <KanbanBoard tasks={tasksData?.items ?? []} onTasksChange={handleTasksChange} />
        </div>
    );
}
