import { KanbanBoard } from './kanban-board';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Task, TaskStatus } from '@entities/task';

type BoardContentProps = {
    isPending: boolean;
    isError: boolean;
    tasks: Task[];
    onTaskStatusChange: (taskId: number, status: TaskStatus) => void;
    onAddTask?: (status: TaskStatus) => void;
};

export function BoardContent({ isPending, isError, tasks, onTaskStatusChange, onAddTask }: BoardContentProps) {
    const t = useTranslations('board');

    if (isPending) {
        return (
            <div className="flex min-h-0 flex-1 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-slate-400" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-slate-200/80 bg-white py-16 text-sm font-medium text-rose-500 shadow-sm">
                {t('loadFailed')}
            </div>
        );
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <KanbanBoard tasks={tasks} onTaskStatusChange={onTaskStatusChange} onAddTask={onAddTask} />
        </div>
    );
}
