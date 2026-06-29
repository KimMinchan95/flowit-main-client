import type { Notification } from '../model/notification.types';

const WORKSPACE_MEMBER_ROLES = ['OWNER', 'ADMIN', 'MEMBER'] as const;
type WorkspaceMemberRole = (typeof WORKSPACE_MEMBER_ROLES)[number];

function isWorkspaceMemberRole(value: unknown): value is WorkspaceMemberRole {
    return typeof value === 'string' && WORKSPACE_MEMBER_ROLES.includes(value as WorkspaceMemberRole);
}

export function getNotificationRoleChange(notification: Notification) {
    const roleChange = notification.changes.find(change => change.element === 'ROLE');

    if (!roleChange || !isWorkspaceMemberRole(roleChange.from) || !isWorkspaceMemberRole(roleChange.to)) {
        return null;
    }

    return {
        from: roleChange.from,
        to: roleChange.to,
    };
}
