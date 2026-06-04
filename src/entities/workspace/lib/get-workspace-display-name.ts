import type { Workspace } from '../model/workspace.type';

type GetWorkspaceDisplayNameParams = {
    workspace: Workspace | undefined;
    isPending: boolean;
    workspaceId: string | number;
};

export function getWorkspaceDisplayName({ workspace, isPending, workspaceId }: GetWorkspaceDisplayNameParams): string {
    if (workspace?.name) {
        return workspace.name;
    }

    if (isPending) {
        return '…';
    }

    return `#${workspaceId}`;
}
