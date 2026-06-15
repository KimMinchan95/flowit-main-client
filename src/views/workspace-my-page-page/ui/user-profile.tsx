'use client';

import { useRef, useState } from 'react';

import { ProfileEditModal } from './profile-edit-modal';
import { PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
    useMeProfileImageQuery,
    useMeUserQuery,
    useProfileImageObjectUrl,
    useUpdateMeProfileImageMutation,
} from '@entities/user';

import { Button, Card } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import {
    ALLOWED_PROFILE_IMAGE_MIME_TYPES,
    compressProfileImage,
    ProfileImageSizeError,
    ProfileImageTypeError,
} from '@shared/lib';
import { useModal } from '@shared/lib/hooks';

export function UserProfile() {
    const t = useTranslations('myPage');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: meUser } = useMeUserQuery();
    const { data: profileImageBlob } = useMeProfileImageQuery({
        profileImageFileId: meUser?.profileImageFileId,
    });
    const profileImageObjectUrl = useProfileImageObjectUrl(profileImageBlob);
    const {
        mutate: updateProfileImageMutate,
        isPending: isUploadingProfileImage,
        error,
    } = useUpdateMeProfileImageMutation();

    const displayNickname = meUser?.nickname?.trim() ?? '';
    const profileText = displayNickname.slice(0, 1) || 'U';

    const { open, onOpen, onClose } = useModal();
    const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null);

    const handleProfileImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';

        if (!file) {
            return;
        }

        setUploadErrorMessage(null);

        try {
            const compressedFile = await compressProfileImage(file);

            updateProfileImageMutate(compressedFile, {
                onError: mutationError => {
                    setUploadErrorMessage(getApiErrorMessage(mutationError, t('profileImageUploadFailed')));
                },
            });
        } catch (uploadError) {
            if (uploadError instanceof ProfileImageTypeError) {
                setUploadErrorMessage(t('profileImageInvalidType'));
                return;
            }

            if (uploadError instanceof ProfileImageSizeError) {
                setUploadErrorMessage(t('profileImageTooLarge'));
                return;
            }

            setUploadErrorMessage(t('profileImageUploadFailed'));
        }
    };

    const submitErrorMessage =
        uploadErrorMessage ?? (error ? getApiErrorMessage(error, t('profileImageUploadFailed')) : null);

    return (
        <Card className="flex h-fit min-w-0 flex-col items-center justify-center">
            <div className="relative mb-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-100/50 bg-blue-50 text-3xl font-bold text-blue-700">
                    {profileImageObjectUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={profileImageObjectUrl} alt={displayNickname} className="h-full w-full object-cover" />
                    ) : (
                        profileText
                    )}
                </div>
                <Button
                    type="button"
                    variant="primary"
                    iconOnly
                    icon={<PencilIcon className="size-3" />}
                    rounded="full"
                    className="absolute right-0 bottom-0 p-2"
                    size="md"
                    disabled={isUploadingProfileImage}
                    onClick={handleProfileImageButtonClick}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={ALLOWED_PROFILE_IMAGE_MIME_TYPES.join(',')}
                    className="hidden"
                    onChange={handleProfileImageChange}
                />
            </div>
            <div className="mb-6 w-full min-w-0 text-center">
                <p className="mb-1 truncate text-xl font-bold text-slate-900" title={displayNickname || undefined}>
                    {displayNickname}
                </p>
                <p className="truncate text-sm font-medium text-slate-500" title={meUser?.email}>
                    {meUser?.email}
                </p>
            </div>
            {submitErrorMessage && (
                <p className="mb-4 w-full text-center text-xs font-bold text-rose-500">{submitErrorMessage}</p>
            )}
            <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={onOpen}>
                {t('profileEdit')}
            </Button>
            <ProfileEditModal open={open} initialNickname={displayNickname} onClose={onClose} />
        </Card>
    );
}
