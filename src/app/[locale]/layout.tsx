import { notFound } from 'next/navigation';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n/routing';

import type { Metadata } from 'next';

import '../globals.css';

export const metadata: Metadata = {
    title: 'Flowit',
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
        <html lang={locale} className="h-full antialiased">
            <body className="flex min-h-full flex-col">
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
