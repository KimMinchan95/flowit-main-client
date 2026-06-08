'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useUpdateMePasswordMutation } from '@entities/user';

import { Button, LabeledInput, Modal } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import { isPasswordConfirmed, isValidPassword, PASSWORD_MAX_LENGTH } from '@shared/lib';

import type { ChangeEvent, FormEvent } from 'react';

// eslint-disable-next-line sonarjs/no-hardcoded-passwords
const PASSWORD_EDIT_FORM_ID = 'password-edit-form';

const INITIAL_FORM_VALUES = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

type PasswordEditModalProps = {
    open: boolean;
    onClose: () => void;
};

export function PasswordEditModal({ open, onClose }: PasswordEditModalProps) {
    const t = useTranslations('myPage');
    const tAuth = useTranslations('auth');
    const commonT = useTranslations('common');

    const { mutate: updateMePasswordMutate, isPending: isUpdatingPassword, error } = useUpdateMePasswordMutation();
    const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

    const { currentPassword, newPassword, confirmNewPassword } = formValues;

    const handleClose = () => {
        setFormValues(INITIAL_FORM_VALUES);
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const canSubmit =
            currentPassword.length > 0 &&
            isValidPassword(newPassword) &&
            isPasswordConfirmed(newPassword, confirmNewPassword);

        if (!canSubmit) {
            return;
        }

        updateMePasswordMutate(
            { currentPassword, newPassword },
            {
                onSuccess: () => {
                    handleClose();
                },
            },
        );
    };

    const isNewPasswordError = newPassword.length > 0 && !isValidPassword(newPassword);
    const isConfirmPasswordError =
        confirmNewPassword.length > 0 && !isPasswordConfirmed(newPassword, confirmNewPassword);
    const isSubmitDisabled =
        isUpdatingPassword ||
        currentPassword.length === 0 ||
        !isValidPassword(newPassword) ||
        !isPasswordConfirmed(newPassword, confirmNewPassword);
    const submitErrorMessage = error ? getApiErrorMessage(error, t('passwordUpdateFailed')) : null;

    return (
        <Modal
            open={open}
            title={tAuth('passwordEdit')}
            onClose={handleClose}
            footer={
                <div className="flex w-full gap-3">
                    <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={handleClose}>
                        {commonT('cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        className="font-bold"
                        disabled={isSubmitDisabled}
                        type="submit"
                        form={PASSWORD_EDIT_FORM_ID}
                    >
                        {isUpdatingPassword ? t('passwordUpdating') : commonT('save')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <form id={PASSWORD_EDIT_FORM_ID} className="flex flex-col gap-4" onSubmit={handleSave}>
                    <LabeledInput
                        type="password"
                        name="currentPassword"
                        label={tAuth('currentPassword')}
                        value={currentPassword}
                        maxLength={PASSWORD_MAX_LENGTH}
                        onChange={handleChange}
                    />
                    <LabeledInput
                        type="password"
                        name="newPassword"
                        label={tAuth('newPassword')}
                        errorMessage={tAuth('passwordRequirements')}
                        isError={isNewPasswordError}
                        value={newPassword}
                        maxLength={PASSWORD_MAX_LENGTH}
                        aria-invalid={isNewPasswordError}
                        onChange={handleChange}
                    />
                    <LabeledInput
                        type="password"
                        name="confirmNewPassword"
                        label={tAuth('confirmPassword')}
                        errorMessage={tAuth('passwordMatchError')}
                        isError={isConfirmPasswordError}
                        value={confirmNewPassword}
                        maxLength={PASSWORD_MAX_LENGTH}
                        aria-invalid={isConfirmPasswordError}
                        onChange={handleChange}
                    />
                </form>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
