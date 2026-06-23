import { DATE_INPUT_FORMAT, dayjs } from './dayjs';

export function parseDateInput(dateInput: string) {
    return dayjs(dateInput, DATE_INPUT_FORMAT, true);
}

export function isValidDateInput(dateInput: string) {
    if (!dateInput) {
        return true;
    }

    return parseDateInput(dateInput).isValid();
}

export function isDateRangeValid(startDateInput: string, dueDateInput: string) {
    if (!startDateInput || !dueDateInput) {
        return true;
    }

    const startDate = parseDateInput(startDateInput);
    const dueDate = parseDateInput(dueDateInput);

    if (!startDate.isValid() || !dueDate.isValid()) {
        return true;
    }

    return !startDate.isAfter(dueDate);
}

export function dateInputToEpochSeconds(dateInput: string): number | undefined {
    if (!dateInput) {
        return undefined;
    }

    const date = parseDateInput(dateInput);

    if (!date.isValid()) {
        return undefined;
    }

    return date.startOf('day').unix();
}

export function epochSecondsToDateInput(epochSeconds: number | null | undefined): string {
    if (epochSeconds === null || epochSeconds === undefined) {
        return '';
    }

    const date = dayjs.unix(epochSeconds);

    if (!date.isValid()) {
        return '';
    }

    return date.format(DATE_INPUT_FORMAT);
}

export function formatEpochSeconds(
    epochSeconds: number | null | undefined,
    format: string = DATE_INPUT_FORMAT,
): string {
    if (epochSeconds === null || epochSeconds === undefined) {
        return '';
    }

    const date = dayjs.unix(epochSeconds);

    if (!date.isValid()) {
        return '';
    }

    return date.format(format);
}

export type TaskScheduleStatus = 'upcoming' | 'active' | 'overdue';

function toDayStart(epochSeconds: number | null | undefined) {
    if (epochSeconds == null) {
        return null;
    }

    const date = dayjs.unix(epochSeconds).startOf('day');

    return date.isValid() ? date : null;
}

export function getTaskScheduleStatus(
    startDate: number | null | undefined,
    dueDate: number | null | undefined,
): TaskScheduleStatus | null {
    const today = dayjs().startOf('day');
    const start = toDayStart(startDate);
    const due = toDayStart(dueDate);

    if (!start && !due) {
        return null;
    }

    const rangeStart = start ?? due!;
    const rangeEnd = due ?? start!;

    if (today.isBefore(rangeStart)) {
        return 'upcoming';
    }

    if (today.isAfter(rangeEnd)) {
        return 'overdue';
    }

    return 'active';
}
