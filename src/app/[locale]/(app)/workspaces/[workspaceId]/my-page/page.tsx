import { WorkspaceMyPagePage } from '@views/workspace-my-page-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('myPage');

export default async function WorkspaceMyPage() {
    return <WorkspaceMyPagePage />;
}
