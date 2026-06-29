import type { Notification } from '../model/notification.types';

function isNotification(value: unknown): value is Notification {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const notification = value as Record<string, unknown>;

    return (
        typeof notification.id === 'number' &&
        typeof notification.type === 'string' &&
        typeof notification.occurredAt === 'number' &&
        typeof notification.read === 'boolean'
    );
}

export function parseNotificationWsMessage(body: string): Notification | null {
    try {
        const parsed: unknown = JSON.parse(body);

        if (!isNotification(parsed)) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}
