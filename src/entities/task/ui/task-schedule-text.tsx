'use client';

import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@shared/lib';
import { getTaskScheduleStatus } from '@shared/lib/date';

import { formatTaskSchedule } from '../lib/format-task-schedule';

import type { TaskScheduleStatus } from '@shared/lib/date';

type TaskScheduleTextProps = {
    startDate: number | null;
    dueDate: number | null;
    emptyLabel?: string;
    className?: string;
    textClassName?: string;
    showIcon?: boolean;
};

const SCHEDULE_TEXT_CLASSNAME: Record<TaskScheduleStatus, string> = {
    upcoming: 'text-slate-500',
    active: 'text-emerald-600',
    overdue: 'text-rose-600',
};

const SCHEDULE_ICON_CLASSNAME: Record<TaskScheduleStatus, string> = {
    upcoming: 'text-slate-400',
    active: 'text-emerald-500',
    overdue: 'text-rose-500',
};

export function TaskScheduleText({
    startDate,
    dueDate,
    emptyLabel,
    className,
    textClassName,
    showIcon = true,
}: TaskScheduleTextProps) {
    const t = useTranslations('board');

    const scheduleLabel = formatTaskSchedule({ startDate, dueDate }, t('taskStartDate'), t('taskDueDate'));
    const scheduleStatus = getTaskScheduleStatus(startDate, dueDate);

    if (!scheduleLabel) {
        return <span className={cn('font-medium text-slate-400', textClassName)}>{emptyLabel}</span>;
    }

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 font-semibold',
                scheduleStatus ? SCHEDULE_TEXT_CLASSNAME[scheduleStatus] : 'text-slate-700',
                className,
            )}
        >
            {showIcon ? (
                <Calendar
                    className={cn(
                        'size-3.5 shrink-0',
                        scheduleStatus ? SCHEDULE_ICON_CLASSNAME[scheduleStatus] : 'text-slate-400',
                    )}
                />
            ) : null}
            <span className={textClassName}>{scheduleLabel}</span>
        </span>
    );
}
