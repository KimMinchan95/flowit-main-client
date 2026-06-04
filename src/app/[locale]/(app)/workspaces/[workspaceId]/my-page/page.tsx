import { WorkspaceMyPagePage } from '@widgets/workspace-my-page-page';

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function WorkspaceMyPage({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceMyPagePage workspaceId={workspaceId} />;
}
