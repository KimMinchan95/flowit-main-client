'use client';

import { NOTIFICATIONS_PAGE_SIZE } from './constants';
import { notificationQueryKeys } from './notification-query-keys';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotifications } from '../api';

type UseNotificationsInfiniteQueryProps = {
    size?: number;
    enabled?: boolean;
};

export function useNotificationsInfiniteQuery({
    size = NOTIFICATIONS_PAGE_SIZE,
    enabled = true,
}: UseNotificationsInfiniteQueryProps = {}) {
    return useInfiniteQuery({
        queryKey: notificationQueryKeys.infiniteList({ size }),
        queryFn: ({ pageParam }) => getNotifications({ page: pageParam, size }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const loadedCount = allPages.reduce((sum, page) => sum + page.items.length, 0);

            if (loadedCount >= lastPage.totalCount) {
                return undefined;
            }

            return allPages.length;
        },
        enabled,
        staleTime: 0,
    });
}
