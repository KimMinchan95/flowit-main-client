import { WorkspaceDashboardPage } from '@views/workspace-dashboard-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('dashboard');

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Dashboard({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceDashboardPage workspaceId={workspaceId} />;
}
