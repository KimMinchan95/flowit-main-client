import { WorkspaceSettingsPage } from '@views/workspace-settings-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('settings');

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Settings({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceSettingsPage workspaceId={workspaceId} />;
}
