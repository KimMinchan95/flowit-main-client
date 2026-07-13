import { LoginPage } from '@views/login-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('login');

export default function Login() {
    return <LoginPage />;
}
