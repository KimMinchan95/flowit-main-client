import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { Link } from '@shared/i18n';
import { Card } from '@shared/ui';

export async function LoginPage() {
    const t = await getTranslations('auth');

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <div className="absolute top-[100px] left-[100px] h-[350px] w-[350px] rounded-full bg-indigo-300/30 blur-[80px] mix-blend-multiply" />
            <Card className="flex flex-col">
                <Image className="mb-5" src="/images/flowit-logo.png" alt={t('Logo alt')} width={100} height={100} />
                <h1 className="text-xl font-semibold text-slate-900">{t('Login')}</h1>
            </Card>
            <div className="mt-4 flex gap-3 text-sm text-slate-600">
                <Link href="/login" locale="ko">
                    한국어
                </Link>
                <Link href="/login" locale="en">
                    English
                </Link>
            </div>
        </div>
    );
}
