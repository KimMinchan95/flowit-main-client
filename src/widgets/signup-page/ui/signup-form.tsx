'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { SIGNUP_FORM_FIELDS, SignupSuccessModal, useSignupForm, useSignupMutation } from '@features/signup';

import { useRouter } from '@shared/i18n';
import { Button, LabeledInput } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import {
    isPasswordConfirmed,
    isValidEmail,
    isValidName,
    isValidPassword,
    MAX_DEFAULT_LENGTH,
    PASSWORD_MAX_LENGTH,
} from '@shared/lib';

import type { FormEvent } from 'react';

export function SignupForm() {
    const t = useTranslations('auth');
    const router = useRouter();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const { mutate, isPending, error } = useSignupMutation();
    const { signupFormValues, confirmPasswordPlain, handleChange } = useSignupForm();
    const { email, passwordPlain, nickname } = signupFormValues;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const canSubmit =
            isValidEmail(email) &&
            isValidPassword(passwordPlain) &&
            isPasswordConfirmed(passwordPlain, confirmPasswordPlain) &&
            isValidName(nickname);

        if (!canSubmit) {
            return;
        }

        mutate(
            { email: email.trim(), passwordPlain, nickname: nickname.trim() },
            {
                onSuccess: () => {
                    setIsSuccessModalOpen(true);
                },
            },
        );
    };

    const handleGoToLogin = () => {
        setIsSuccessModalOpen(false);
        router.push('/login');
    };

    const submitErrorMessage = error ? getApiErrorMessage(error, t('signupFailed')) : null;

    const { isEmailError, isPasswordError, isConfirmPasswordError, isNameError } = {
        isEmailError: email.length > 0 && !isValidEmail(email),
        isPasswordError: passwordPlain.length > 0 && !isValidPassword(passwordPlain),
        isConfirmPasswordError:
            confirmPasswordPlain.length > 0 && !isPasswordConfirmed(passwordPlain, confirmPasswordPlain),
        isNameError: nickname.length > 0 && !isValidName(nickname),
    };

    const isError = isEmailError || isPasswordError || isConfirmPasswordError || isNameError;
    const isEmpty = [email, passwordPlain, confirmPasswordPlain, nickname].some(value => value.trim().length === 0);
    const isDisabled = isPending || isError || isEmpty;

    return (
        <>
            <form className="flex w-full flex-col gap-1" onSubmit={handleSubmit}>
                <div className="flex w-full flex-col gap-4">
                    <LabeledInput
                        type="email"
                        name={SIGNUP_FORM_FIELDS.EMAIL}
                        label={t('emailAccount')}
                        errorMessage={t('emailFormatError')}
                        isError={isEmailError}
                        value={email}
                        onChange={handleChange}
                        maxLength={MAX_DEFAULT_LENGTH}
                    />
                    <LabeledInput
                        type="password"
                        name={SIGNUP_FORM_FIELDS.PASSWORD_PLAIN}
                        label={t('password')}
                        errorMessage={t('passwordRequirements')}
                        isError={isPasswordError}
                        value={passwordPlain}
                        onChange={handleChange}
                        maxLength={PASSWORD_MAX_LENGTH}
                    />
                    <LabeledInput
                        type="password"
                        name="confirmPasswordPlain"
                        label={t('confirmPassword')}
                        errorMessage={t('passwordMatchError')}
                        isError={isConfirmPasswordError}
                        value={confirmPasswordPlain}
                        onChange={handleChange}
                        maxLength={PASSWORD_MAX_LENGTH}
                    />
                    <LabeledInput
                        type="text"
                        name={SIGNUP_FORM_FIELDS.NICKNAME}
                        label={t('name')}
                        errorMessage={t('enterName')}
                        isError={isNameError}
                        value={nickname}
                        onChange={handleChange}
                        maxLength={MAX_DEFAULT_LENGTH}
                    />
                </div>
                {submitErrorMessage && <p className="text-sm text-red-600">{submitErrorMessage}</p>}
                <Button fullWidth className="mt-4" type="submit" disabled={isDisabled}>
                    <span className="font-extrabold">{isPending ? t('signingUp') : t('signUpButton')}</span>
                </Button>
            </form>
            <SignupSuccessModal open={isSuccessModalOpen} onConfirm={handleGoToLogin} />
        </>
    );
}
