'use client';

import { WorkspacesCard } from './workspaces-card';

import { CreateWorkspace } from '@features/create-workspace';
import { SignUpWithInvitationCode } from '@features/sign-up-with-invitation-code';
import { useMeWorkspacesQuery } from '@entities/user';

export function WorkspacesList() {
    const { data: meWorkspaces } = useMeWorkspacesQuery();

    return (
        <div className="min-h-0 flex-1 overflow-y-auto px-1 py-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {meWorkspaces?.items.map(workspace => (
                    <WorkspacesCard key={workspace.id} workspace={workspace} />
                ))}
                <SignUpWithInvitationCode />
                <CreateWorkspace />
            </div>
        </div>
    );
}
