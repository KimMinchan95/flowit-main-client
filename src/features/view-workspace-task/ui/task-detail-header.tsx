'use client';

import { ChevronDown, Loader2, Maximize2, Minimize2, Pencil, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useUpdateWorkspaceTaskStatusMutation } from '@entities/task';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@shared/ui';
import { cn } from '@shared/lib';

import type { TaskDetail, TaskStatus } from '@entities/task';
import type { TaskDetailViewMode } from './task-detail-view';

const TASK_STATUS_OPTIONS = [
    { id: 'TODO' as const, titleKey: 'todo' as const, dotClassName: 'bg-slate-400' },
    { id: 'IN_PROGRESS' as const, titleKey: 'inProgress' as const, dotClassName: 'bg-blue-500' },
    { id: 'DONE' as const, titleKey: 'done' as const, dotClassName: 'bg-emerald-500' },
] satisfies Array<{ id: TaskStatus; titleKey: 'todo' | 'inProgress' | 'done'; dotClassName: string }>;

type TaskDetailHeaderProps = {
    workspaceId: string;
    task: TaskDetail;
    viewMode: TaskDetailViewMode;
    onViewModeChange: (mode: TaskDetailViewMode) => void;
    onEdit: () => void;
    onClose: () => void;
};

export function TaskDetailHeader({
    workspaceId,
    task,
    viewMode,
    onViewModeChange,
    onEdit,
    onClose,
}: TaskDetailHeaderProps) {
    const tColumns = useTranslations('board.columns');
    const tDetail = useTranslations('board.taskDetail');

    const { mutate: updateStatus, isPending: isStatusUpdating } = useUpdateWorkspaceTaskStatusMutation({ workspaceId });

    const currentStatus = TASK_STATUS_OPTIONS.find(option => option.id === task.status) ?? TASK_STATUS_OPTIONS[0];

    const handleStatusChange = (status: TaskStatus) => {
        if (status === task.status || isStatusUpdating) {
            return;
        }

        updateStatus({ taskId: task.id, status });
    };

    const isCenter = viewMode === 'center';

    return (
        <div className="shrink-0 border-b border-slate-100 px-6 py-5">
            <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-2">
                        <h2 className="truncate text-lg font-bold text-slate-900">{task.title}</h2>
                        <button
                            type="button"
                            onClick={onEdit}
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            aria-label={tDetail('edit')}
                        >
                            <Pencil size={15} />
                        </button>
                    </div>

                    <Dropdown>
                        <DropdownTrigger>
                            <button
                                type="button"
                                disabled={isStatusUpdating}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isStatusUpdating ? (
                                    <Loader2 size={14} className="animate-spin text-slate-400" />
                                ) : (
                                    <span className={cn('size-2 rounded-full', currentStatus.dotClassName)} />
                                )}
                                {tColumns(currentStatus.titleKey)}
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu className="z-[100] w-52">
                            {TASK_STATUS_OPTIONS.map(option => (
                                <DropdownItem
                                    key={option.id}
                                    onClick={() => handleStatusChange(option.id)}
                                    className={cn(
                                        'gap-2 font-bold',
                                        task.status === option.id && 'bg-blue-50 text-blue-600',
                                    )}
                                >
                                    <span className={cn('size-2 rounded-full', option.dotClassName)} />
                                    {tColumns(option.titleKey)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewModeChange(isCenter ? 'side' : 'center')}
                        className="h-9 w-9 p-0 text-slate-400 hover:text-slate-600"
                        aria-label={isCenter ? tDetail('shrink') : tDetail('expand')}
                    >
                        {isCenter ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-9 w-9 p-0 text-slate-400 hover:text-slate-600"
                        aria-label={tDetail('close')}
                    >
                        <X size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
