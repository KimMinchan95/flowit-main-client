import { SignupPage } from '@views/signup-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('signup');

export default function Signup() {
    return <SignupPage />;
}
