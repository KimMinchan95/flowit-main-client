'use client';

import { DashboardMyTaskItem } from './dashboard-my-task-item';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';
import { WORKSPACE_ROUTES } from '@shared/lib';

import type { Task } from '@entities/task';

type DashboardMyTasksProps = {
    workspaceId: string;
    tasks: Task[];
    isPending: boolean;
    isError?: boolean;
    errorMessage?: string | null;
};

function DashboardMyTasksSkeleton() {
    return (
        <div className="divide-y divide-slate-100">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex animate-pulse items-center gap-3 py-3.5">
                    <div className="h-2 w-2 rounded-full bg-slate-200" />
                    <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 w-3/5 rounded bg-slate-200" />
                        <div className="h-2.5 w-1/4 rounded bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}

type DashboardMyTasksBodyProps = {
    workspaceId: string;
    tasks: Task[];
    isPending: boolean;
    isError?: boolean;
    errorMessage?: string | null;
};

function DashboardMyTasksBody({
    workspaceId,
    tasks,
    isPending,
    isError = false,
    errorMessage = null,
}: DashboardMyTasksBodyProps) {
    const t = useTranslations('dashboard');

    if (isPending) {
        return <DashboardMyTasksSkeleton />;
    }

    if (isError) {
        return <p className="px-1 py-6 text-sm font-medium text-rose-500">{errorMessage ?? t('tasksLoadFailed')}</p>;
    }

    if (tasks.length === 0) {
        return <p className="px-1 py-6 text-sm font-medium text-slate-400">{t('noTasks')}</p>;
    }

    return (
        <>
            <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_100px_80px_72px] gap-4 border-b border-slate-100 px-1 pb-3 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                <span>{t('columns.task')}</span>
                <span>{t('columns.progress')}</span>
                <span>{t('columns.status')}</span>
                <span className="text-right">{t('columns.due')}</span>
            </div>
            <div className="divide-y divide-slate-100">
                {tasks.map(task => (
                    <DashboardMyTaskItem key={task.id} workspaceId={workspaceId} task={task} />
                ))}
            </div>
        </>
    );
}

export function DashboardMyTasks({
    workspaceId,
    tasks,
    isPending,
    isError = false,
    errorMessage = null,
}: DashboardMyTasksProps) {
    const t = useTranslations('dashboard');
    const boardHref = WORKSPACE_ROUTES.board(workspaceId);

    return (
        <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white p-7 shadow-sm xl:col-span-7 xl:h-full xl:min-h-0">
            <div className="mb-4 flex shrink-0 items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-[17px] font-bold text-slate-900">{t('myTasks')}</h2>
                <Link
                    href={boardHref}
                    className="flex items-center gap-0.5 text-[13px] font-bold text-blue-600 transition-colors hover:text-blue-800"
                >
                    {t('viewAll')} <ChevronRight size={14} />
                </Link>
            </div>

            <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
                <DashboardMyTasksBody
                    workspaceId={workspaceId}
                    tasks={tasks}
                    isPending={isPending}
                    isError={isError}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    );
}
