import { getTranslations } from 'next-intl/server';

export async function SignupPage() {
    const t = await getTranslations('auth');

    return <div>{t('Sign up')}</div>;
}
