import { WORKSPACE_ROUTES } from '@shared/lib';

import type { NotificationLink } from '../model/notification.types';

export function resolveNotificationLinkHref(link: NotificationLink): string | null {
    switch (link.type) {
        case 'WORKSPACE_MEMBERS':
            return link.workspaceId !== null && link.workspaceId !== undefined
                ? WORKSPACE_ROUTES.members(link.workspaceId)
                : null;
        case 'NONE':
        default:
            return null;
    }
}
