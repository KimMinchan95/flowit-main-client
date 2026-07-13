import { WorkspaceMembersPage } from '@views/workspace-members-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('members');

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Members({ params }: PageProps) {
    const { workspaceId } = await params;
    return <WorkspaceMembersPage workspaceId={workspaceId} />;
}
