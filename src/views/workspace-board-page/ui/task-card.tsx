'use client';

import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';

import type { Task } from '@entities/task';

type TaskCardProps = {
    task: Task;
    onClick?: () => void;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
    const t = useTranslations('board');

    return (
        <div
            draggable
            onDragStart={onDragStart}
            onClick={onClick}
            className="group cursor-pointer rounded-xl border border-slate-200/80 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
        >
            {task.tags.length > 0 ? (
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    {task.tags.map(tag => (
                        <span
                            key={tag}
                            className="rounded border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-slate-600"
                        >
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </div>
            ) : null}

            <h4 className="mb-4 text-[14px] leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                {task.title}
            </h4>

            <div className="mb-4">
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">{t('progress')}</span>
                    <span className="text-[11px] font-extrabold text-slate-700">{task.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${task.progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
                {task.assignee ? (
                    <div className="flex items-center gap-2">
                        <MemberAvatar name={task.assignee.name} size="sm" />
                        <span className="text-sm font-bold text-slate-500">{task.assignee.name}</span>
                    </div>
                ) : (
                    <span className="text-sm font-bold text-slate-400">{t('unassigned')}</span>
                )}
            </div>
        </div>
    );
}
