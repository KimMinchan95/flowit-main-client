import { NotFoundPage } from '@views/not-found-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('notFound');

export default function NotFound() {
    return <NotFoundPage />;
}
