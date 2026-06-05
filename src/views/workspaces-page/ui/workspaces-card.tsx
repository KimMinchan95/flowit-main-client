import { ChevronRight, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';
import { WORKSPACE_ROUTES } from '@shared/lib/routes/workspace-routes';

import type { Workspace } from '@entities/workspace';

export function WorkspacesCard({ workspace }: { workspace: Workspace }) {
    const t = useTranslations('workspaces');

    return (
        <Link
            href={WORKSPACE_ROUTES.dashboard(workspace.id)}
            className="group flex h-40 cursor-pointer flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
        >
            <div className="min-w-0">
                <h3
                    className="mb-1 truncate text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600"
                    title={workspace.name}
                >
                    {workspace.name}
                </h3>
                <p className="flex items-center gap-1.5 text-base font-medium text-slate-500">
                    <Users className="size-3" />
                    {t('activeUsers', { count: workspace.memberCount })}
                </p>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-blue-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                <span>{t('enter')}</span>
                <ChevronRight className="size-4" />
            </div>
        </Link>
    );
}
