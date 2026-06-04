import type { Workspace } from '../model/workspace.type';

export function findWorkspaceById(items: Workspace[], workspaceId: string | number): Workspace | undefined {
    return items.find(item => String(item.id) === String(workspaceId));
}
