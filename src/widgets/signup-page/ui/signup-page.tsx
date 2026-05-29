import { SignupForm } from './signup-form';
import { getTranslations } from 'next-intl/server';

import { Link } from '@shared/i18n';
import { AuthCard } from '@shared/ui';

export async function SignupPage() {
    const t = await getTranslations('auth');

    return (
        <AuthCard
            logoAlt={t('logoAlt')}
            title={t('createAccount')}
            description={t('signupDescription')}
            footer={
                <>
                    <p className="text-center text-sm font-semibold text-slate-500">{t('alreadyHaveAccount')}</p>
                    <Link href="/login" className="text-center text-sm font-bold text-blue-600 hover:underline">
                        {t('login')}
                    </Link>
                </>
            }
        >
            <SignupForm />
        </AuthCard>
    );
}
