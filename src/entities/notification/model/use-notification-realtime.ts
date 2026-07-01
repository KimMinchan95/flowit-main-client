'use client';

import { useEffect, useRef } from 'react';

import { NOTIFICATION_WS_DESTINATION } from './constants';
import { useQueryClient } from '@tanstack/react-query';

import { useWebSocketClient, useWebSocketSubscription } from '@shared/api/ws';
import { useDocumentVisibleEffect } from '@shared/lib/hooks';

import { invalidateNotificationQueries } from '../lib/invalidate-notification-queries';
import { parseNotificationWsMessage } from '../lib/parse-notification-ws-message';
import { isNotificationInCache, upsertNotificationInCache } from '../lib/upsert-notification-in-cache';
import { showNotificationToast } from '../ui/show-notification-toast';

import type { WebSocketConnectionState } from '@shared/api/ws';

export function useNotificationRealtime() {
    const queryClient = useQueryClient();
    const { connectionState } = useWebSocketClient();
    const previousConnectionStateRef = useRef<WebSocketConnectionState>('idle');

    useEffect(() => {
        const previousConnectionState = previousConnectionStateRef.current;
        previousConnectionStateRef.current = connectionState;

        if (connectionState === 'connected' && previousConnectionState === 'disconnected') {
            invalidateNotificationQueries(queryClient);
        }
    }, [connectionState, queryClient]);

    useDocumentVisibleEffect(() => {
        invalidateNotificationQueries(queryClient);
    });

    useWebSocketSubscription(NOTIFICATION_WS_DESTINATION, message => {
        const notification = parseNotificationWsMessage(message.body);

        if (!notification) {
            return;
        }

        const isNew = !isNotificationInCache(queryClient, notification.id);

        upsertNotificationInCache(queryClient, notification);

        if (isNew) {
            showNotificationToast(notification);
        }
    });
}
