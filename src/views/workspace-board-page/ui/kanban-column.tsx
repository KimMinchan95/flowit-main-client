'use client';

import { TaskCard } from './task-card';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@shared/ui';
import { cn } from '@shared/lib';

import type { Task, TaskStatus } from '@entities/task';
import type { BoardColumnConfig } from '../model';

type KanbanColumnProps = {
    column: BoardColumnConfig;
    tasks: Task[];
    onTaskClick?: (task: Task) => void;
    onTaskDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: number) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>, status: TaskStatus) => void;
    onAddTask?: () => void;
};

export function KanbanColumn({ column, tasks, onTaskClick, onTaskDragStart, onDrop, onAddTask }: KanbanColumnProps) {
    const tColumns = useTranslations('board.columns');
    const tBoard = useTranslations('board');

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div
            className={cn(
                'flex h-fit max-h-full min-h-0 w-[320px] shrink-0 flex-col rounded-2xl border border-slate-200/60 p-5',
                column.bgClassName,
            )}
            onDragOver={handleDragOver}
            onDrop={event => onDrop(event, column.id)}
        >
            <div className="mb-5 flex shrink-0 items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                    <div className={cn('size-2 rounded-full', column.dotClassName)} />
                    <h3 className="text-[14px] font-bold tracking-wide text-slate-800">{tColumns(column.titleKey)}</h3>
                </div>
                <span className="rounded bg-white/60 px-2.5 py-0.5 text-[12px] font-bold text-slate-600">
                    {tasks.length}
                </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col space-y-3 overflow-y-auto pb-2">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onClick={onTaskClick ? () => onTaskClick(task) : undefined}
                        onDragStart={event => onTaskDragStart(event, task.id)}
                    />
                ))}
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={onAddTask}
                    className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300/80 py-2.5 text-[13px] font-bold text-slate-500 transition-colors hover:bg-white hover:text-slate-700"
                >
                    {tBoard('addTask')}
                </Button>
            </div>
        </div>
    );
}
