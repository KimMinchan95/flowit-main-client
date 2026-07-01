'use client';

import { useTranslations } from 'next-intl';

import { useLogoutMutation } from '@features/logout';
import { createProfileImageObjectUrl, useMeProfileImageQuery, useMeUserQuery } from '@entities/user';

import { useChangeLocale } from '@shared/i18n';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@shared/ui';

export function AppHeaderProfileButton() {
    const t = useTranslations('auth');
    const { locale, toggleLocale } = useChangeLocale();

    const { data: meUser } = useMeUserQuery({ enabled: true });
    const { data: profileImageBlob } = useMeProfileImageQuery({
        profileImageFileId: meUser?.profileImageFileId,
    });
    const profileImageObjectUrl = createProfileImageObjectUrl(profileImageBlob);
    const profileText = meUser?.nickname?.trim().slice(0, 1) || 'U';
    const { mutate } = useLogoutMutation();

    const handleLogout = () => {
        mutate();
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    rounded="full"
                    size="sm"
                    variant="light-blue"
                    className="aspect-square size-9 shrink-0 p-0 text-sm leading-none"
                    aria-label={meUser?.nickname || 'Profile'}
                    shadow={false}
                >
                    {profileImageObjectUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={profileImageObjectUrl}
                            alt={meUser?.nickname || 'Profile'}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        profileText
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onClick={handleLogout}>{t('logout')}</DropdownItem>
                <DropdownItem onClick={toggleLocale}>{locale === 'ko' ? 'English' : '한국어'}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
