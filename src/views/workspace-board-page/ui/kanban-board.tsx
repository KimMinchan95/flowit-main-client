'use client';

import { KanbanColumn } from './kanban-column';

import { BOARD_COLUMNS } from '../model';

import type { Task, TaskStatus } from '@entities/task';

type KanbanBoardProps = {
    tasks: Task[];
    onTasksChange: (tasks: Task[]) => void;
    onTaskClick?: (task: Task) => void;
    onAddTask?: (status: TaskStatus) => void;
};

export function KanbanBoard({ tasks, onTasksChange, onTaskClick, onAddTask }: KanbanBoardProps) {
    const handleTaskDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: number) => {
        event.dataTransfer.setData('taskId', String(taskId));
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        event.preventDefault();
        const taskId = Number(event.dataTransfer.getData('taskId'));
        if (!taskId) {
            return;
        }

        onTasksChange(tasks.map(task => (task.id === taskId ? { ...task, status } : task)));
    };

    return (
        <div className="flex flex-1 items-start gap-6 overflow-x-auto pb-4">
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
