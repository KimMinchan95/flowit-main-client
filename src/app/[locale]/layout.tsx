import { notFound } from 'next/navigation';

import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n/routing';

import { AppProviders } from '@/app/providers';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Flowit',
        template: '%s | Flowit',
    },
    description: 'Flowit',
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <AppProviders messages={messages} locale={locale}>
            {children}
        </AppProviders>
    );
}
