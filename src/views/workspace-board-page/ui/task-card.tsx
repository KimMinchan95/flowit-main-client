'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import { TaskScheduleText } from '@entities/task';

import { cn } from '@shared/lib';

import type { Task, TaskPriority } from '@entities/task';

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

export function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
    const t = useTranslations('board');
    const [isDragging, setIsDragging] = useState(false);

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

            {task.startDate || task.dueDate ? (
                <div className="mb-4">
                    <TaskScheduleText
                        startDate={task.startDate}
                        dueDate={task.dueDate}
                        className="text-xs"
                        textClassName="text-xs"
                    />
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
                        <MemberAvatar
                            name={task.assignee.name}
                            workspaceId={task.workspaceId}
                            memberId={task.assignee.memberId}
                            size="sm"
                        />
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
