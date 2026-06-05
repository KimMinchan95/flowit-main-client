'use client';

import { useTranslations } from 'next-intl';

import { useLogoutMutation } from '@features/logout';
import { useMeUserQuery } from '@entities/user';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@shared/ui';

export function WorkspacesHeaderProfileButton() {
    const t = useTranslations('auth');
    const { data: meUser } = useMeUserQuery({ enabled: true });
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
                    {profileText}
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onClick={handleLogout}>{t('logout')}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
