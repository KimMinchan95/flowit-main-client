import { notificationQueryKeys } from '../model/notification-query-keys';

import type { QueryClient } from '@tanstack/react-query';

export function invalidateNotificationQueries(queryClient: QueryClient) {
    return queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all }).catch(() => undefined);
}
