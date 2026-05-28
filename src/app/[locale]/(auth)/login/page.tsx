import { setRequestLocale } from 'next-intl/server';

import { LoginPage } from '@widgets/login-page';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Login({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <LoginPage />;
}
