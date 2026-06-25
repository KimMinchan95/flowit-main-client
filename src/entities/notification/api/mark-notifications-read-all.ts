import { apiRequest } from '@shared/api/http';

import type { MarkNotificationsReadAllResponse } from '../model/mark-notifications-read-all.types';

export function markNotificationsReadAll() {
    return apiRequest<MarkNotificationsReadAllResponse>('/v1/notifications/read-all', {
        method: 'PATCH',
    });
}
