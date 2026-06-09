'use client';

import { useEffect } from 'react';

import { QueryProvider } from './query-provider';
import { NextIntlClientProvider } from 'next-intl';

import type { AbstractIntlMessages } from 'next-intl';

type AppProvidersProps = {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
};

export function AppProviders({ children, messages, locale }: AppProvidersProps) {
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return (
        <QueryProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </QueryProvider>
    );
}
