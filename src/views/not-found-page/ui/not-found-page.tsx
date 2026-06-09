import Image from 'next/image';
import Link from 'next/link';

import { getLocale, getTranslations } from 'next-intl/server';

import { Card } from '@shared/ui';
import { cn } from '@shared/lib';

export async function NotFoundPage() {
    const t = await getTranslations('notFound');
    const locale = await getLocale();

    return (
        <div className="relative flex min-h-dvh flex-col items-center justify-center px-4">
            <div className="absolute top-[100px] left-[100px] h-[350px] w-[350px] rounded-full bg-indigo-300/30 mix-blend-multiply blur-[80px]" />

            <Card className="flex w-full max-w-md flex-col items-center px-8 py-10">
                <Image
                    className="mb-6 h-auto w-28"
                    src="/images/flowit-logo.png"
                    width={100}
                    height={100}
                    alt={t('logoAlt')}
                    priority
                />
                <p className="mb-2 text-6xl font-bold text-blue-600">404</p>
                <h1 className="mb-2 text-center text-xl font-bold text-slate-900">{t('title')}</h1>
                <p className="mb-8 text-center text-sm font-semibold text-slate-500">{t('description')}</p>
                <Link
                    href={`/${locale}`}
                    className={cn(
                        'inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold shadow-sm transition-all',
                        'bg-blue-600 text-white hover:bg-blue-700',
                    )}
                >
                    {t('goHome')}
                </Link>
            </Card>
        </div>
    );
}
