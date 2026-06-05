'use client';

import { useTranslations } from 'next-intl';

import { LOGIN_FORM_FIELDS, useLoginForm, useLoginMutation } from '@features/login';

import { useRouter } from '@shared/i18n';
import { Button, LabeledInput } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import { AUTH_ROUTES, MAX_DEFAULT_LENGTH, PASSWORD_MAX_LENGTH } from '@shared/lib';

import type { FormEvent } from 'react';

export function LoginForm() {
    const t = useTranslations('auth');
    const router = useRouter();
    const { mutate, isPending, error } = useLoginMutation();
    const { loginFormValues, handleChange } = useLoginForm();
    const { email, password } = loginFormValues;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate(
            { email, password },
            {
                onSuccess: () => {
                    router.replace(AUTH_ROUTES.WORKSPACES);
                },
            },
        );
    };

    const submitErrorMessage = error ? getApiErrorMessage(error, t('loginFailed')) : null;

    return (
        <form className="flex w-full flex-col gap-1" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-4">
                <LabeledInput
                    type="email"
                    name={LOGIN_FORM_FIELDS.EMAIL}
                    label={t('emailAccount')}
                    value={email}
                    onChange={handleChange}
                    maxLength={MAX_DEFAULT_LENGTH}
                />
                <LabeledInput
                    type="password"
                    name={LOGIN_FORM_FIELDS.PASSWORD}
                    label={t('password')}
                    value={password}
                    onChange={handleChange}
                    maxLength={PASSWORD_MAX_LENGTH}
                />
            </div>
            {submitErrorMessage && <p className="text-sm text-red-600">{submitErrorMessage}</p>}
            <Button fullWidth className="mt-4" type="submit" disabled={isPending}>
                <span className="font-extrabold">{t('login')}</span>
            </Button>
        </form>
    );
}
