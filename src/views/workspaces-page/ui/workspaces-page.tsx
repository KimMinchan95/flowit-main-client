import { WorkspacesList } from './workspaces-list';
import { getTranslations } from 'next-intl/server';

export async function WorkspacesPage() {
    const t = await getTranslations('workspaces');

    return (
        <main className="animate-in fade-in mx-auto flex h-full min-h-0 w-full flex-1 flex-col p-10 duration-500">
            <h1 className="mb-10 shrink-0 text-2xl font-bold tracking-tight text-slate-900">{t('myWorkspaces')}</h1>
            <WorkspacesList />
        </main>
    );
}
