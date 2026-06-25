import type { NotificationsResponse } from '../model/notification.types';
import type { InfiniteData } from '@tanstack/react-query';

export function flattenNotificationsPages(data: InfiniteData<NotificationsResponse> | undefined) {
    if (!data || data.pages.length === 0) {
        return {
            items: [],
            totalCount: 0,
            unreadCount: 0,
            unseenCount: 0,
        };
    }

    const firstPage = data.pages[0];

    return {
        items: data.pages.flatMap(page => page.items),
        totalCount: firstPage.totalCount,
        unreadCount: firstPage.unreadCount,
        unseenCount: firstPage.unseenCount,
    };
}
