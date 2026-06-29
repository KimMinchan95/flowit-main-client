import { createQueryKeys } from '@shared/api';

import type { GetNotificationsParams } from './notification.types';

export const notificationQueryKeys = {
    ...createQueryKeys('notification'),
    list: (params: GetNotificationsParams = {}) => ['notification', 'list', params] as const,
    infiniteList: (params: Omit<GetNotificationsParams, 'page'> = {}) =>
        ['notification', 'infinite-list', params] as const,
    infiniteLists: () => ['notification', 'infinite-list'] as const,
};
