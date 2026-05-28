import { setRequestLocale } from 'next-intl/server';

import { SignupPage } from '@widgets/signup-page';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Signup({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <SignupPage />;
}
