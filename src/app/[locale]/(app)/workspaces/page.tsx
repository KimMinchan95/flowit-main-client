import { WorkspacesPage } from '@views/workspaces-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('workspaces');

export default function Workspaces() {
    return <WorkspacesPage />;
}
