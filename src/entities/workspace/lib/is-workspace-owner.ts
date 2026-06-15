import type { WorkspaceMemberRole } from '../model/workspace.type';

const WORKSPACE_OWNER_ROLE: WorkspaceMemberRole = 'OWNER';

export function isWorkspaceOwner(role?: string): role is WorkspaceMemberRole {
    return role === WORKSPACE_OWNER_ROLE;
}
