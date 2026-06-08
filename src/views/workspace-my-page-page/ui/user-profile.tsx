'use client';

import { useState } from 'react';

import { PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMeUserQuery, useUpdateMeUserMutation } from '@entities/user';

import { Button, LabeledInput, Modal } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import { isValidName, MAX_DEFAULT_LENGTH } from '@shared/lib';

// 이미지가 들어왔을 떄 추후 추가
export function UserProfile() {
    const t = useTranslations('myPage');
    const tAuth = useTranslations('auth');
    const commonT = useTranslations('common');

    const { data: meUser } = useMeUserQuery();
    const { mutate: updateMeUserMutate, isPending: isUpdatingMeUser, error } = useUpdateMeUserMutation();
    const profileText = meUser?.nickname?.trim().slice(0, 1) || 'U';

    const [open, setOpen] = useState(false);
    const [nickname, setNickname] = useState(meUser?.nickname ?? '');

    const handleOpen = () => {
        setOpen(true);
        setNickname(meUser?.nickname ?? '');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (!isValidName(nickname)) {
            return;
        }

        updateMeUserMutate(
            { nickname: nickname.trim() },
            {
                onSuccess: () => {
                    handleClose();
                },
            },
        );
    };

    const isNicknameError = nickname.length > 0 && !isValidName(nickname);
    const isSaveDisabled = isUpdatingMeUser || !isValidName(nickname);
    const submitErrorMessage = error ? getApiErrorMessage(error, t('profileUpdateFailed')) : null;

    return (
        <>
            <div className="relative mb-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-blue-100/50 bg-blue-50 text-3xl font-bold text-blue-700">
                    {profileText}
                </div>
                <Button
                    variant="primary"
                    iconOnly
                    icon={<PencilIcon className="size-3" />}
                    rounded="full"
                    className="absolute right-0 bottom-0 p-2"
                    size="md"
                />
            </div>
            <div className="mb-6 w-full min-w-0 text-center">
                <p className="mb-1 truncate text-xl font-bold text-slate-900" title={meUser?.nickname}>
                    {meUser?.nickname}
                </p>
                <p className="truncate text-sm font-medium text-slate-500" title={meUser?.email}>
                    {meUser?.email}
                </p>
            </div>
            <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={handleOpen}>
                {t('profileEdit')}
            </Button>
            <Modal
                open={open}
                title={t('profileEdit')}
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
                            disabled={isSaveDisabled}
                            onClick={handleSave}
                        >
                            {isUpdatingMeUser ? t('profileUpdating') : commonT('save')}
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col gap-2">
                    <LabeledInput
                        label={tAuth('name')}
                        errorMessage={tAuth('enterName')}
                        isError={isNicknameError}
                        value={nickname}
                        maxLength={MAX_DEFAULT_LENGTH}
                        aria-invalid={isNicknameError}
                        onChange={e => setNickname(e.target.value)}
                    />
                    {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
                </div>
            </Modal>
        </>
    );
}
