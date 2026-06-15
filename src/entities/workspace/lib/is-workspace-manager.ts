import type { WorkspaceMemberRole } from '../model/workspace.type';

const WORKSPACE_MANAGER_ROLES: WorkspaceMemberRole[] = ['OWNER', 'ADMIN'];

export function isWorkspaceManager(role?: string): role is WorkspaceMemberRole {
    return WORKSPACE_MANAGER_ROLES.includes(role as WorkspaceMemberRole);
}
