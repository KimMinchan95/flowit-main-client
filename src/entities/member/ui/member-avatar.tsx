'use client';

import { useProfileImageObjectUrl } from '@entities/user';

import { cn } from '@shared/lib';

import { useWorkspaceMemberProfileImageQuery } from '../model';

type MemberAvatarSize = 'sm' | 'md';

type MemberAvatarProps = {
    name: string;
    profileImageUrl?: string | null;
    size?: MemberAvatarSize;
    className?: string;
};

const sizeClassNameMap: Record<MemberAvatarSize, string> = {
    sm: 'size-7 text-xs',
    md: 'size-9 text-sm',
};

export function MemberAvatar({ name, profileImageUrl = null, size = 'md', className }: MemberAvatarProps) {
    const { data: profileImageBlob } = useWorkspaceMemberProfileImageQuery({
        profileImageUrl,
        enabled: !!profileImageUrl,
    });
    const profileImageObjectUrl = useProfileImageObjectUrl(profileImageBlob);
    const profileText = name.trim().slice(0, 1) || '?';

    return (
        <div
            className={cn(
                'flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-100/50 bg-blue-50 font-bold text-blue-600',
                sizeClassNameMap[size],
                className,
            )}
        >
            {profileImageObjectUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profileImageObjectUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
                profileText
            )}
        </div>
    );
}
