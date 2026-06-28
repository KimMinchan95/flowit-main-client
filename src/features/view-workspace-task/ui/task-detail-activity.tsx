'use client';

import { useTranslations } from 'next-intl';

import { formatEpochSeconds } from '@shared/lib/date';

import type { TaskDetail } from '@entities/task';

type TaskDetailActivityProps = {
    task: TaskDetail;
};

export function TaskDetailActivity({ task }: TaskDetailActivityProps) {
    const t = useTranslations('board.taskDetail');

    const activities = [
        {
            key: 'created',
            label: t('activityCreated'),
            time: formatEpochSeconds(task.createdAt, 'YYYY.MM.DD HH:mm'),
        },
        {
            key: 'updated',
            label: t('activityUpdated'),
            time: formatEpochSeconds(task.updatedAt, 'YYYY.MM.DD HH:mm'),
        },
    ];

    return (
        <div className="relative space-y-7 pb-8 pl-2">
            <div className="absolute top-6 bottom-4 left-[23px] w-px bg-slate-100" />
            {activities.map(activity => (
                <div key={activity.key} className="relative flex gap-4">
                    <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[13px] font-bold text-slate-500">
                        ·
                    </div>
                    <div className="pt-1.5">
                        <p className="text-[14px] leading-snug font-medium text-slate-700">{activity.label}</p>
                        <p className="mt-1 text-[12px] font-medium text-slate-400">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
