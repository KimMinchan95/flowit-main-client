'use client';

import { useState } from 'react';

import { ProfileEditModal } from './profile-edit-modal';
import { PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMeUserQuery } from '@entities/user';

import { Button } from '@shared/ui';

export function UserProfile() {
    const t = useTranslations('myPage');

    const { data: meUser } = useMeUserQuery();
    const displayNickname = meUser?.nickname?.trim() ?? '';
    const profileText = displayNickname.slice(0, 1) || 'U';

    const [open, setOpen] = useState(false);

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
                <p className="mb-1 truncate text-xl font-bold text-slate-900" title={displayNickname || undefined}>
                    {displayNickname}
                </p>
                <p className="truncate text-sm font-medium text-slate-500" title={meUser?.email}>
                    {meUser?.email}
                </p>
            </div>
            <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={() => setOpen(true)}>
                {t('profileEdit')}
            </Button>
            <ProfileEditModal open={open} initialNickname={displayNickname} onClose={() => setOpen(false)} />
        </>
    );
}
