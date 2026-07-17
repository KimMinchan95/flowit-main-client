'use client';

import { useEffect } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';
import { Button, StatusPage } from '@shared/ui';
import { AUTH_ROUTES, cn } from '@shared/lib';

type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
    scope?: 'global' | 'workspace';
};

export function ErrorPage({ error, reset, scope = 'global' }: ErrorPageProps) {
    const t = useTranslations('errorPage');
    const locale = useLocale();

    useEffect(() => {
        console.error(error);
    }, [error]);

    const description = scope === 'workspace' ? t('workspaceDescription') : t('description');

    return (
        <StatusPage
            statusCode="Error"
            logoAlt={t('logoAlt')}
            title={t('title')}
            description={description}
            actions={
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button type="button" variant="primary" size="lg" className="font-bold shadow-sm" onClick={reset}>
                        {t('retry')}
                    </Button>
                    <Link
                        href={AUTH_ROUTES.HOME}
                        locale={locale}
                        className={cn(
                            'inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold shadow-sm transition-all',
                            'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100',
                        )}
                    >
                        {t('goHome')}
                    </Link>
                </div>
            }
        />
    );
}
