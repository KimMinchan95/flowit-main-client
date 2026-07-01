type FormatRelativeEpochSecondsLabels = {
    justNow: string;
    minutesAgo: (count: number) => string;
    hoursAgo: (count: number) => string;
    daysAgo: (count: number) => string;
};

export function formatRelativeEpochSeconds(
    epochSeconds: number | null | undefined,
    labels: FormatRelativeEpochSecondsLabels,
    nowEpochSeconds: number = Math.floor(Date.now() / 1000),
): string {
    if (epochSeconds == null) {
        return '';
    }

    const diffSeconds = Math.max(0, nowEpochSeconds - epochSeconds);

    if (diffSeconds < 60) {
        return labels.justNow;
    }

    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffMinutes < 60) {
        return labels.minutesAgo(diffMinutes);
    }

    const diffHours = Math.floor(diffSeconds / 3600);

    if (diffHours < 24) {
        return labels.hoursAgo(diffHours);
    }

    const diffDays = Math.floor(diffSeconds / 86400);

    return labels.daysAgo(diffDays);
}
