'use client';

import { DashboardActivityItem } from './dashboard-activity-item';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';
import { WORKSPACE_ROUTES } from '@shared/lib';

import type { ActivityRecord } from '@entities/workspace';

type DashboardRecentActivitiesProps = {
    workspaceId: string;
    activities: ActivityRecord[];
    isPending: boolean;
    isError?: boolean;
    errorMessage?: string | null;
};

type DashboardRecentActivitiesBodyProps = {
    workspaceId: string;
    activities: ActivityRecord[];
    isPending: boolean;
    isError?: boolean;
    errorMessage?: string | null;
};

function DashboardRecentActivitiesBody({
    workspaceId,
    activities,
    isPending,
    isError = false,
    errorMessage = null,
}: DashboardRecentActivitiesBodyProps) {
    const t = useTranslations('dashboard');

    if (isPending) {
        return <p className="py-6 text-sm font-medium text-slate-400">…</p>;
    }

    if (isError) {
        return <p className="py-6 text-sm font-medium text-rose-500">{errorMessage ?? t('activitiesLoadFailed')}</p>;
    }

    if (activities.length === 0) {
        return <p className="py-6 text-sm font-medium text-slate-400">{t('noActivities')}</p>;
    }

    return (
        <div className="relative space-y-7 pl-2">
            <div className="absolute top-6 bottom-4 left-[23px] w-px bg-slate-100" />
            {activities.map(record => (
                <DashboardActivityItem key={record.id} workspaceId={workspaceId} record={record} />
            ))}
        </div>
    );
}

export function DashboardRecentActivities({
    workspaceId,
    activities,
    isPending,
    isError = false,
    errorMessage = null,
}: DashboardRecentActivitiesProps) {
    const t = useTranslations('dashboard');
    const boardHref = WORKSPACE_ROUTES.board(workspaceId);

    return (
        <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white p-7 shadow-sm xl:col-span-5 xl:h-full xl:min-h-0">
            <div className="mb-6 flex shrink-0 items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-[17px] font-bold text-slate-900">{t('recentActivities')}</h2>
                <Link
                    href={boardHref}
                    className="flex items-center gap-0.5 text-[13px] font-bold text-blue-600 transition-colors hover:text-blue-800"
                >
                    {t('viewAll')} <ChevronRight size={14} />
                </Link>
            </div>

            <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
                <DashboardRecentActivitiesBody
                    workspaceId={workspaceId}
                    activities={activities}
                    isPending={isPending}
                    isError={isError}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    );
}
