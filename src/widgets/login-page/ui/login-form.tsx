'use client';

import { useTranslations } from 'next-intl';

import { Button, LabeledInput } from '@shared/ui';

import type { FormEvent } from 'react';

export function LoginForm() {
    const t = useTranslations('auth');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form className="flex w-full flex-col gap-1" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-4">
                <LabeledInput type="email" label={t('emailAccount')} />
                <LabeledInput type="password" label={t('password')} />
            </div>
            <Button fullWidth type="submit">
                <span className="font-extrabold">{t('login')}</span>
            </Button>
        </form>
    );
}
