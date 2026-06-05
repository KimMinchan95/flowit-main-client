import { WorkspaceDashboardPage } from '@views/workspace-dashboard-page';

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Dashboard({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceDashboardPage workspaceId={workspaceId} />;
}
