import { notificationQueryKeys } from '../model/notification-query-keys';

import type { NotificationsResponse } from '../model/notification.types';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';

function markNotificationsResponseAsRead(response: NotificationsResponse): NotificationsResponse {
    return {
        ...response,
        unreadCount: 0,
        items: response.items.map(item => ({ ...item, read: true })),
    };
}

export function markAllNotificationsReadInCache(queryClient: QueryClient) {
    queryClient.setQueriesData<NotificationsResponse>({ queryKey: notificationQueryKeys.lists() }, old =>
        old ? markNotificationsResponseAsRead(old) : old,
    );

    queryClient.setQueriesData<InfiniteData<NotificationsResponse>>(
        { queryKey: notificationQueryKeys.infiniteLists() },
        old => {
            if (!old) {
                return old;
            }

            return {
                ...old,
                pages: old.pages.map(page => markNotificationsResponseAsRead(page)),
            };
        },
    );
}
