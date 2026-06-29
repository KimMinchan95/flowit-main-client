'use client';

import { useCallback, useEffect, useRef } from 'react';

import { NOTIFICATION_WS_DESTINATION } from './constants';
import { notificationQueryKeys } from './notification-query-keys';
import { useQueryClient } from '@tanstack/react-query';

import { useWebSocketClient, useWebSocketSubscription } from '@shared/api/ws';

import { parseNotificationWsMessage } from '../lib/parse-notification-ws-message';
import { upsertNotificationInCache } from '../lib/upsert-notification-in-cache';

import type { WebSocketConnectionState, WebSocketMessage } from '@shared/api/ws';

export function useNotificationRealtime() {
    const queryClient = useQueryClient();
    const { connectionState } = useWebSocketClient();
    const previousConnectionStateRef = useRef<WebSocketConnectionState>('idle');

    useEffect(() => {
        const previousConnectionState = previousConnectionStateRef.current;
        previousConnectionStateRef.current = connectionState;

        if (connectionState === 'connected' && previousConnectionState === 'disconnected') {
            queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all }).catch(() => undefined);
        }
    }, [connectionState, queryClient]);

    const handleNotificationMessage = useCallback(
        (message: WebSocketMessage) => {
            const notification = parseNotificationWsMessage(message.body);

            if (!notification) {
                return;
            }

            upsertNotificationInCache(queryClient, notification);
        },
        [queryClient],
    );

    useWebSocketSubscription(NOTIFICATION_WS_DESTINATION, handleNotificationMessage);
}
