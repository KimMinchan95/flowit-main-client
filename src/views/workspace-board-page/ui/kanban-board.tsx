'use client';

import { KanbanColumn } from './kanban-column';

import { BOARD_COLUMNS } from '../model';

import type { Task, TaskStatus } from '@entities/task';

type KanbanBoardProps = {
    tasks: Task[];
    onTaskStatusChange: (taskId: number, status: TaskStatus) => void;
    onTaskClick?: (task: Task) => void;
    onAddTask?: (status: TaskStatus) => void;
};

export function KanbanBoard({ tasks, onTaskStatusChange, onTaskClick, onAddTask }: KanbanBoardProps) {
    const handleTaskDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: number) => {
        event.dataTransfer.setData('taskId', String(taskId));
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        event.preventDefault();
        const taskId = Number(event.dataTransfer.getData('taskId'));
        if (!taskId) {
            return;
        }

        const task = tasks.find(currentTask => currentTask.id === taskId);

        if (!task || task.status === status) {
            return;
        }

        onTaskStatusChange(taskId, status);
    };

    return (
        <div className="flex min-h-0 flex-1 items-stretch gap-6 overflow-x-auto overflow-y-hidden pb-2">
            {BOARD_COLUMNS.map(column => (
                <KanbanColumn
                    key={column.id}
                    column={column}
                    tasks={tasks.filter(task => task.status === column.id)}
                    onTaskClick={onTaskClick}
                    onTaskDragStart={handleTaskDragStart}
                    onDrop={handleDrop}
                    onAddTask={() => onAddTask?.(column.id)}
                />
            ))}
        </div>
    );
}
