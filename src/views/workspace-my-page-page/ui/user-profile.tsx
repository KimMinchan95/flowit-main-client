'use client';

import { PencilIcon } from 'lucide-react';

import { useMeUserQuery } from '@entities/user';

import { Button } from '@shared/ui';

// 이미지가 들어왔을 떄 추후 추가
export function UserProfile() {
    const { data: meUser } = useMeUserQuery({ enabled: false });
    const profileText = meUser?.nickname?.trim().slice(0, 1) || 'U';
    return (
        <div className="relative">
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
    );
}
