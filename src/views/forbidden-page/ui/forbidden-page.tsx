import { getLocale, getTranslations } from 'next-intl/server';

import { StatusPage } from '@shared/ui';

export async function ForbiddenPage() {
    const t = await getTranslations('forbidden');
    const locale = await getLocale();

    return (
        <StatusPage
            statusCode="403"
            logoAlt={t('logoAlt')}
            title={t('title')}
            description={t('description')}
            goHomeLabel={t('goHome')}
            homeHref={`/${locale}`}
        />
    );
}
