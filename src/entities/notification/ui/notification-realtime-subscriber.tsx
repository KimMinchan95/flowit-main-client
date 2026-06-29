'use client';

import { useNotificationRealtime } from '../model/use-notification-realtime';

export function NotificationRealtimeSubscriber() {
    useNotificationRealtime();

    return null;
}
