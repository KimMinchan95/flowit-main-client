import { LoginForm } from './login-form';
import { getTranslations } from 'next-intl/server';

import { Link } from '@shared/i18n';
import { AuthCard } from '@shared/ui';

export async function LoginPage() {
    const t = await getTranslations('auth');

    return (
        <>
            <AuthCard
                logoAlt={t('logoAlt')}
                title={t('welcomeBack')}
                description={t('welcomeBackDescription')}
                footer={
                    <>
                        <p className="text-center text-sm font-semibold text-slate-500">{t('noAccount')}</p>
                        <Link href="/signup" className="text-center text-sm font-bold text-blue-600 hover:underline">
                            {t('signUp')}
                        </Link>
                    </>
                }
                bottomContent={
                    <div className="mt-4 flex gap-3 text-sm text-slate-600">
                        <Link href="/login" locale="ko">
                            한국어
                        </Link>
                        <Link href="/login" locale="en">
                            English
                        </Link>
                    </div>
                }
            >
                <LoginForm />
            </AuthCard>
        </>
    );
}
