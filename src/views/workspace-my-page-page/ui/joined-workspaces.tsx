'use client';

import { LayoutDashboardIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMeWorkspacesQuery } from '@entities/user';
import { WorkspaceRoleBadge } from '@entities/workspace';

import { Card } from '@shared/ui';

const WORKSPACE_ROLES = ['OWNER', 'ADMIN', 'MEMBER'] as const;
type WorkspaceRole = (typeof WORKSPACE_ROLES)[number];

function isWorkspaceRole(role: string): role is WorkspaceRole {
    return WORKSPACE_ROLES.includes(role as WorkspaceRole);
}

export function JoinedWorkspaces() {
    const t = useTranslations('myPage');
    const tMembers = useTranslations('members');
    const { data: meWorkspaces } = useMeWorkspacesQuery();

    return (
        <Card
            className="min-w-0 overflow-hidden"
            title={
                <div className="flex items-center justify-between">
                    <span>{t('joinedWorkspaces')}</span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-sm font-bold text-slate-600">
                        {meWorkspaces?.items.length}
                    </span>
                </div>
            }
        >
            {meWorkspaces?.items.map(workspace => {
                const role = isWorkspaceRole(workspace.role) ? workspace.role : 'MEMBER';

                return (
                    <div
                        key={workspace.id}
                        className="group flex min-w-0 items-center justify-between rounded-lg border border-transparent p-4 transition-all hover:bg-slate-50"
                    >
                        <div className="flex min-w-0 flex-1 items-center gap-3.5 overflow-hidden">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                                <LayoutDashboardIcon className="size-4 text-slate-500 transition-colors group-hover:text-slate-700" />
                            </span>
                            <span
                                className="block min-w-0 flex-1 truncate text-sm font-bold text-slate-800 transition-colors group-hover:text-slate-900"
                                title={workspace.name}
                            >
                                {workspace.name}
                            </span>
                        </div>
                        <WorkspaceRoleBadge role={role} label={tMembers(`roles.${role}`)} className="ml-3 shrink-0" />
                    </div>
                );
            })}
        </Card>
    );
}
