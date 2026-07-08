import { notificationQueryKeys } from '../model/notification-query-keys';

import type { QueryClient } from '@tanstack/react-query';

export function resetNotificationsInfiniteQuery(queryClient: QueryClient) {
    return queryClient.resetQueries({ queryKey: notificationQueryKeys.infiniteLists() });
}
