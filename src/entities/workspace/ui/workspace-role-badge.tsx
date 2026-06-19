import { cn } from '@shared/lib';

import type { WorkspaceMemberRole } from '../model';

type WorkspaceRoleBadgeProps = {
    role: WorkspaceMemberRole;
    label: string;
    className?: string;
};

const ROLE_BADGE_CLASSNAME: Record<WorkspaceMemberRole, string> = {
    OWNER: 'bg-purple-50 text-purple-700 border border-purple-100/50',
    ADMIN: 'bg-orange-50 text-orange-700 border border-orange-100/50',
    MEMBER: 'bg-slate-100 text-slate-600 border border-transparent',
};

export function WorkspaceRoleBadge({ role, label, className }: WorkspaceRoleBadgeProps) {
    return (
        <span className={cn('rounded px-2.5 py-1 text-[12px] font-bold', ROLE_BADGE_CLASSNAME[role], className)}>
            {label}
        </span>
    );
}
