'use client';

import { WorkspacesCard } from './workspaces-card';
import { WorkspaceCreate } from './workspaces-create';

import { useMeWorkspacesQuery } from '@entities/workspace';

export function WorkspacesList() {
    const { data: meWorkspaces } = useMeWorkspacesQuery();

    return (
        <div className="min-h-0 flex-1 overflow-y-auto px-1 py-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {meWorkspaces?.items.map(workspace => (
                    <WorkspacesCard key={workspace.id} workspace={workspace} />
                ))}
                <WorkspaceCreate />
            </div>
        </div>
    );
}
