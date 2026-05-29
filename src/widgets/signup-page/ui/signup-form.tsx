'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import {
    isPasswordConfirmed,
    isValidEmail,
    isValidName,
    isValidPassword,
    MAX_DEFAULT_LENGTH,
    PASSWORD_MAX_LENGTH,
} from '@shared/lib';

import { Button, LabeledInput } from '@/shared/ui/index';

import type { ChangeEvent, FormEvent } from 'react';

type FormState = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
};

export function SignupForm() {
    const t = useTranslations('auth');

    const [formState, setFormState] = useState<FormState>({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const { email, password, confirmPassword, name } = formState;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const canSubmit =
            isValidEmail(email) &&
            isValidPassword(password) &&
            isPasswordConfirmed(password, confirmPassword) &&
            isValidName(name);

        if (!canSubmit) {
            return;
        }
    };

    const { isEmailError, isPasswordError, isConfirmPasswordError, isNameError } = {
        isEmailError: email.length > 0 && !isValidEmail(email),
        isPasswordError: password.length > 0 && !isValidPassword(password),
        isConfirmPasswordError: confirmPassword.length > 0 && !isPasswordConfirmed(password, confirmPassword),
        isNameError: name.length > 0 && !isValidName(name),
    };

    return (
        <form className="flex w-full flex-col gap-1" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-4">
                <LabeledInput
                    type="email"
                    name="email"
                    label={t('emailAccount')}
                    errorMessage={t('emailFormatError')}
                    isError={isEmailError}
                    value={email}
                    onChange={handleChange}
                    maxLength={MAX_DEFAULT_LENGTH}
                />
                <LabeledInput
                    type="password"
                    name="password"
                    label={t('password')}
                    errorMessage={t('passwordRequirements')}
                    isError={isPasswordError}
                    value={password}
                    onChange={handleChange}
                    maxLength={PASSWORD_MAX_LENGTH}
                />
                <LabeledInput
                    type="password"
                    name="confirmPassword"
                    label={t('confirmPassword')}
                    errorMessage={t('passwordMatchError')}
                    isError={isConfirmPasswordError}
                    value={confirmPassword}
                    onChange={handleChange}
                    maxLength={PASSWORD_MAX_LENGTH}
                />
                <LabeledInput
                    type="text"
                    name="name"
                    label={t('name')}
                    errorMessage={t('enterName')}
                    isError={isNameError}
                    value={name}
                    onChange={handleChange}
                    maxLength={MAX_DEFAULT_LENGTH}
                />
            </div>
            <div>
                <Button fullWidth type="submit">
                    <span className="font-extrabold">{t('signUpButton')}</span>
                </Button>
            </div>
        </form>
    );
}
