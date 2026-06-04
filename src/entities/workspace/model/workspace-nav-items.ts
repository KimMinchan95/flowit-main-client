import { Kanban, LayoutDashboard, Settings, Users } from 'lucide-react';

import { WORKSPACE_ROUTES } from '@shared/lib/routes/workspace-routes';

type WorkspaceNavItemKey = 'dashboard' | 'board' | 'members' | 'settings';

export type WorkspaceNavItem = {
    key: WorkspaceNavItemKey;
    labelKey: WorkspaceNavItemKey;
    href: (workspaceId: string) => string;
    icon: typeof LayoutDashboard;
};

export const WORKSPACE_NAV_ITEMS: WorkspaceNavItem[] = [
    { key: 'dashboard', labelKey: 'dashboard', href: id => WORKSPACE_ROUTES.dashboard(id), icon: LayoutDashboard },
    { key: 'board', labelKey: 'board', href: id => WORKSPACE_ROUTES.board(id), icon: Kanban },
    { key: 'members', labelKey: 'members', href: id => WORKSPACE_ROUTES.members(id), icon: Users },
    { key: 'settings', labelKey: 'settings', href: id => WORKSPACE_ROUTES.settings(id), icon: Settings },
];
