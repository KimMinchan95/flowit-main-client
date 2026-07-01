'use client';

import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import { TaskScheduleText } from '@entities/task';

import { cn } from '@shared/lib';

import type { TaskDetail, TaskPriority } from '@entities/task';

type TaskDetailMetaProps = {
    workspaceId: string;
    task: TaskDetail;
    className?: string;
};

const PRIORITY_CLASSNAME: Record<TaskPriority, string> = {
    HIGH: 'border-rose-100 bg-rose-50 text-rose-600',
    MEDIUM: 'border-amber-100 bg-amber-50 text-amber-700',
    LOW: 'border-slate-100 bg-slate-50 text-slate-600',
};

export function TaskDetailMeta({ workspaceId, task, className }: TaskDetailMetaProps) {
    const t = useTranslations('board');
    const tDetail = useTranslations('board.taskDetail');

    return (
        <div className={cn('px-8 py-6', className)}>
            <div className="grid grid-cols-[100px_1fr] items-center gap-y-5 text-[15px]">
                <div className="text-[13px] font-bold text-slate-500">{tDetail('assignee')}</div>
                <div className="flex items-center gap-2.5 font-bold text-slate-800">
                    {task.assignee ? (
                        <>
                            <MemberAvatar
                                name={task.assignee.name}
                                workspaceId={workspaceId}
                                memberId={task.assignee.memberId}
                                size="sm"
                            />
                            {task.assignee.name}
                        </>
                    ) : (
                        <span className="text-slate-400">{t('unassigned')}</span>
                    )}
                </div>

                <div className="text-[13px] font-bold text-slate-500">{tDetail('schedule')}</div>
                <div className="font-bold text-slate-800">
                    <TaskScheduleText
                        startDate={task.startDate}
                        dueDate={task.dueDate}
                        emptyLabel={tDetail('noSchedule')}
                        textClassName="text-[15px] font-bold"
                    />
                </div>

                <div className="text-[13px] font-bold text-slate-500">{tDetail('priority')}</div>
                <div>
                    <span
                        className={cn(
                            'rounded-md border px-2.5 py-1 text-[12px] font-bold tracking-wide',
                            PRIORITY_CLASSNAME[task.priority],
                        )}
                    >
                        {t(`taskPriority.${task.priority}`)}
                    </span>
                </div>

                <div className="text-[13px] font-bold text-slate-500">{t('progress')}</div>
                <div className="flex w-full items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${task.progress}%` }}
                        />
                    </div>
                    <span className="min-w-[3.5ch] text-right text-[14px] font-extrabold text-blue-600">
                        {task.progress}%
                    </span>
                </div>

                <div className="mt-1.5 self-start text-[13px] font-bold text-slate-500">{tDetail('tags')}</div>
                <div className="flex flex-wrap gap-2">
                    {task.tags.length > 0 ? (
                        task.tags.map(tag => (
                            <span
                                key={tag}
                                className="rounded-md border border-slate-200/80 bg-white px-2.5 py-1 text-[12px] font-bold text-slate-600 shadow-sm"
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm font-medium text-slate-400">{tDetail('noTags')}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
