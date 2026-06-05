import { WorkspaceMembersPage } from '@views/workspace-members-page';

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Members({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceMembersPage workspaceId={workspaceId} />;
}
