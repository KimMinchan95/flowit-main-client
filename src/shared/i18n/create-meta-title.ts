import { getTranslations } from 'next-intl/server';

import type messages from './messages/ko.json';
import type { Metadata } from 'next';

type MetaKey = keyof typeof messages.meta;

type GenerateMetadataProps = {
    params?: Promise<{ locale?: string }>;
};

export function createMetaTitle(key: MetaKey) {
    return async function generateMetadata({ params }: GenerateMetadataProps = {}): Promise<Metadata> {
        const locale = params ? (await params).locale : undefined;
        const t = locale ? await getTranslations({ locale, namespace: 'meta' }) : await getTranslations('meta');

        return { title: t(key) };
    };
}
