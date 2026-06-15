import { WorkspaceDangerZone } from './workspace-danger-zone';
import { WorkspaceSetting } from './workspace-setting';
import { useTranslations } from 'next-intl';

import { PageTitle } from '@shared/ui';

type Props = {
    workspaceId: string;
};

export function WorkspaceSettingsPage({ workspaceId }: Props) {
    const t = useTranslations('settings');

    return (
        <main className="p-8">
            <PageTitle title={t('title')} />
            <div className="space-y-6">
                <WorkspaceSetting workspaceId={workspaceId} />
                <WorkspaceDangerZone workspaceId={workspaceId} />
            </div>
        </main>
    );
}
