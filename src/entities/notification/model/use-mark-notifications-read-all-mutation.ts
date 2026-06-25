'use client';

import { notificationMutationKeys } from './notification-mutation-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markNotificationsReadAll } from '../api';
import { markAllNotificationsReadInCache } from '../lib/mark-all-notifications-read-in-cache';

export function useMarkNotificationsReadAllMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: notificationMutationKeys.markReadAll(),
        mutationFn: () => markNotificationsReadAll(),
        onSuccess: () => {
            markAllNotificationsReadInCache(queryClient);
        },
    });
}
