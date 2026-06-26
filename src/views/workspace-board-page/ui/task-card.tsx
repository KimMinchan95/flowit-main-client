'use client';

import { useState } from 'react';

import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';

import { cn } from '@shared/lib';
import { formatEpochSeconds, getTaskScheduleStatus } from '@shared/lib/date';

import type { Task, TaskPriority } from '@entities/task';
import type { TaskScheduleStatus } from '@shared/lib/date';

type TaskCardProps = {
    task: Task;
    onClick?: () => void;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
};

const PRIORITY_CLASSNAME: Record<TaskPriority, string> = {
    HIGH: 'border-rose-100 bg-rose-50 text-rose-600',
    MEDIUM: 'border-amber-100 bg-amber-50 text-amber-700',
    LOW: 'border-slate-100 bg-slate-50 text-slate-600',
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

function formatTaskSchedule(task: Task, startLabel: string, dueLabel: string) {
    const startDate = formatEpochSeconds(task.startDate);
    const dueDate = formatEpochSeconds(task.dueDate);

    if (startDate && dueDate) {
        return `${startDate} ~ ${dueDate}`;
    }

    if (startDate) {
        return `${startLabel} ${startDate}`;
    }

    if (dueDate) {
        return `${dueLabel} ${dueDate}`;
    }

    return null;
}

export function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
    const t = useTranslations('board');
    const [isDragging, setIsDragging] = useState(false);

    const scheduleLabel = formatTaskSchedule(task, t('taskStartDate'), t('taskDueDate'));
    const scheduleStatus = getTaskScheduleStatus(task.startDate, task.dueDate);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        onDragStart?.(event);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={onClick}
            className={cn(
                'group cursor-pointer rounded-xl border border-slate-200/80 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md',
                isDragging && 'opacity-40',
            )}
        >
            {task.tags.length > 0 ? (
                <div className="mb-3 flex h-6 flex-nowrap items-center gap-2 overflow-hidden transition-all group-hover:h-auto group-hover:flex-wrap group-hover:overflow-visible">
                    {task.tags.map(tag => (
                        <span
                            key={tag}
                            className="shrink-0 rounded border border-slate-100 bg-slate-50 px-2 py-0.5 text-xs font-bold tracking-wide text-slate-600"
                        >
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </div>
            ) : null}

            <h4 className="mb-3 text-sm leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                {task.title}
            </h4>

            {scheduleLabel ? (
                <div
                    className={cn(
                        'mb-4 flex items-center gap-1.5 text-xs font-semibold',
                        scheduleStatus ? SCHEDULE_TEXT_CLASSNAME[scheduleStatus] : 'text-slate-500',
                    )}
                >
                    <Calendar
                        className={cn(
                            'size-3.5 shrink-0',
                            scheduleStatus ? SCHEDULE_ICON_CLASSNAME[scheduleStatus] : 'text-slate-400',
                        )}
                    />
                    <span>{scheduleLabel}</span>
                </div>
            ) : null}

            <div className="mb-4">
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{t('progress')}</span>
                    <span className="text-xs font-extrabold text-slate-700">{task.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={`h-full rounded-full bg-blue-500 transition-all duration-500`}
                        style={{ width: `${task.progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3">
                {task.assignee ? (
                    <div className="flex min-w-0 items-center gap-2">
                        <MemberAvatar name={task.assignee.name} size="sm" />
                        <span className="truncate text-sm font-bold text-slate-500">{task.assignee.name}</span>
                    </div>
                ) : (
                    <span className="text-sm font-bold text-slate-400">{t('unassigned')}</span>
                )}

                <span
                    className={cn(
                        'inline-flex shrink-0 rounded border px-2 py-0.5 text-xs font-bold tracking-wide',
                        PRIORITY_CLASSNAME[task.priority],
                    )}
                >
                    {t(`taskPriority.${task.priority}`)}
                </span>
            </div>
        </div>
    );
}
