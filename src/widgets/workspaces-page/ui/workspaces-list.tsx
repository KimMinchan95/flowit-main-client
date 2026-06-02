'use client';

import { WorkspacesCard } from './workspaces-card';
import { WorkspaceCreate } from './workspaces-create';
import { useQuery } from '@tanstack/react-query';

import { meUser, meUserQueryKeys } from '@entities/user';

export function WorkspacesList() {
    const { data: meInfo } = useQuery({
        queryKey: meUserQueryKeys.all,
        queryFn: () => meUser(),
    });

    const workspaces = meInfo?.workspaces;

    return (
        <div className="min-h-0 flex-1 overflow-y-auto px-1 py-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {workspaces?.map(workspace => (
                    <WorkspacesCard key={workspace.id} workspace={workspace} />
                ))}
                <WorkspaceCreate />
            </div>
        </div>
    );
}
