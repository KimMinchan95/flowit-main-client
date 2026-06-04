import { WorkspaceSettingsPage } from '@widgets/workspace-settings-page';

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Settings({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceSettingsPage workspaceId={workspaceId} />;
}
