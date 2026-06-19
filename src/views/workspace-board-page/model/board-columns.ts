import type { TaskStatus } from '@entities/task';

export type BoardColumnConfig = {
    id: TaskStatus;
    titleKey: 'todo' | 'inProgress' | 'done';
    dotClassName: string;
    bgClassName: string;
};

export const BOARD_COLUMNS: BoardColumnConfig[] = [
    {
        id: 'TODO',
        titleKey: 'todo',
        dotClassName: 'bg-slate-400',
        bgClassName: 'bg-[#F1F5F9]',
    },
    {
        id: 'IN_PROGRESS',
        titleKey: 'inProgress',
        dotClassName: 'bg-blue-500',
        bgClassName: 'bg-[#EFF6FF]',
    },
    {
        id: 'DONE',
        titleKey: 'done',
        dotClassName: 'bg-emerald-500',
        bgClassName: 'bg-[#F0FDF4]',
    },
];
