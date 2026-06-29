import { notificationQueryKeys } from '../model/notification-query-keys';

import type { Notification, NotificationsResponse } from '../model/notification.types';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';

function upsertNotificationInNotificationsResponse(
    response: NotificationsResponse,
    notification: Notification,
): NotificationsResponse {
    const isDuplicate = response.items.some(item => item.id === notification.id);

    if (isDuplicate) {
        return response;
    }

    const unreadDelta = notification.read ? 0 : 1;

    return {
        ...response,
        items: [notification, ...response.items],
        totalCount: response.totalCount + 1,
        unreadCount: response.unreadCount + unreadDelta,
        unseenCount: response.unseenCount + 1,
    };
}

function upsertNotificationInInfiniteData(
    data: InfiniteData<NotificationsResponse>,
    notification: Notification,
): InfiniteData<NotificationsResponse> {
    const isDuplicate = data.pages.some(page => page.items.some(item => item.id === notification.id));

    if (isDuplicate || data.pages.length === 0) {
        return data;
    }

    const unreadDelta = notification.read ? 0 : 1;
    const [firstPage, ...restPages] = data.pages;

    return {
        ...data,
        pages: [
            {
                ...firstPage,
                items: [notification, ...firstPage.items],
                totalCount: firstPage.totalCount + 1,
                unreadCount: firstPage.unreadCount + unreadDelta,
                unseenCount: firstPage.unseenCount + 1,
            },
            ...restPages,
        ],
    };
}

export function upsertNotificationInCache(queryClient: QueryClient, notification: Notification) {
    queryClient.setQueriesData<NotificationsResponse>({ queryKey: notificationQueryKeys.lists() }, old =>
        old ? upsertNotificationInNotificationsResponse(old, notification) : old,
    );

    queryClient.setQueriesData<InfiniteData<NotificationsResponse>>(
        { queryKey: notificationQueryKeys.infiniteLists() },
        old => (old ? upsertNotificationInInfiniteData(old, notification) : old),
    );
}
