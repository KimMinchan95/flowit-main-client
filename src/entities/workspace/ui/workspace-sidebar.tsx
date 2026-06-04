'use client';

import { ChevronRight, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@shared/i18n';
import { cn } from '@shared/lib/clsx/cn';
import { WORKSPACE_ROUTES } from '@shared/lib/routes/workspace-routes';

import { useWorkspaceById } from '../model/use-workspace-by-id';
import { WORKSPACE_NAV_ITEMS } from '../model/workspace-nav-items';

import type { LucideIcon } from 'lucide-react';

type Props = { workspaceId: string };

type SidebarNavLinkProps = {
    href: string;
    icon: LucideIcon;
    label: string;
    pathname: string;
};

function isSidebarNavActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNavLink({ href, icon: Icon, label, pathname }: SidebarNavLinkProps) {
    const isActive = isSidebarNavActive(pathname, href);

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
            )}
        >
            <Icon className="size-4" />
            {label}
        </Link>
    );
}

export function WorkspaceSidebar({ workspaceId }: Props) {
    const pathname = usePathname();
    const t = useTranslations('sidebar');
    const { displayName: workspaceName } = useWorkspaceById({ workspaceId });

    return (
        <aside className="flex h-full min-h-0 w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white">
            <div className="px-5 pt-5 pb-3">
                <Link
                    href={WORKSPACE_ROUTES.list}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 p-3 transition-colors hover:border-slate-200"
                >
                    <div className="min-w-0">
                        <p className="mb-0.5 text-[11px] font-medium text-slate-400">{t('currentWorkspace')}</p>
                        <p className="truncate text-[13px] font-bold text-slate-800" title={workspaceName}>
                            {workspaceName}
                        </p>
                    </div>
                    <ChevronRight className="size-3.5 shrink-0 text-slate-400" aria-hidden />
                </Link>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-3">
                {WORKSPACE_NAV_ITEMS.map(item => (
                    <SidebarNavLink
                        key={item.key}
                        href={item.href(workspaceId)}
                        icon={item.icon}
                        label={t(item.labelKey)}
                        pathname={pathname}
                    />
                ))}
            </nav>
            <div className="border-t border-slate-100 px-3 py-3">
                <SidebarNavLink
                    href={WORKSPACE_ROUTES.myPage(workspaceId)}
                    icon={User}
                    label={t('myPage')}
                    pathname={pathname}
                />
            </div>
        </aside>
    );
}
