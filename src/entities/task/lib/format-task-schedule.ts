import { formatEpochSeconds } from '@shared/lib/date';

type TaskScheduleSource = {
    startDate: number | null;
    dueDate: number | null;
};

export function formatTaskSchedule(task: TaskScheduleSource, startLabel: string, dueLabel: string) {
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
