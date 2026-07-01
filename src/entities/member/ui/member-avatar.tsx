'use client';

import { createProfileImageObjectUrl, useMeProfileImageQuery, useMeUserQuery } from '@entities/user';

import { cn } from '@shared/lib';

import { findMemberProfileImageUrl } from '../lib/find-member-profile-image-url';
import { useWorkspaceMemberProfileImageQuery, useWorkspaceMembersQuery } from '../model';

type MemberAvatarSize = 'sm' | 'md';
type ProfileImageSource = 'me' | 'workspace-member';

type MemberAvatarProps = {
    name: string;
    profileImageSource?: ProfileImageSource;
    profileImageUrl?: string | null;
    workspaceId?: string | number;
    memberId?: number | null;
    size?: MemberAvatarSize;
    className?: string;
};

const sizeClassNameMap: Record<MemberAvatarSize, string> = {
    sm: 'size-7 text-xs',
    md: 'size-9 text-sm',
};

export function MemberAvatar({
    name,
    profileImageSource = 'workspace-member',
    profileImageUrl,
    workspaceId,
    memberId,
    size = 'md',
    className,
}: MemberAvatarProps) {
    const useMeProfile = profileImageSource === 'me';
    const shouldResolveFromMembers = workspaceId != null && profileImageUrl === undefined;

    const { data: membersData } = useWorkspaceMembersQuery({
        workspaceId: workspaceId!,
        enabled: shouldResolveFromMembers && !useMeProfile,
    });

    const resolvedProfileImageUrl = shouldResolveFromMembers
        ? findMemberProfileImageUrl({
              members: membersData?.members,
              memberId,
          })
        : (profileImageUrl ?? null);

    const { data: meUser } = useMeUserQuery({ enabled: useMeProfile });
    const { data: meProfileBlob } = useMeProfileImageQuery({
        profileImageFileId: meUser?.profileImageFileId,
        enabled: useMeProfile && meUser?.profileImageFileId != null,
    });

    const { data: memberProfileBlob } = useWorkspaceMemberProfileImageQuery({
        profileImageUrl: resolvedProfileImageUrl,
        enabled: !useMeProfile && Boolean(resolvedProfileImageUrl),
    });

    const profileImageBlob = useMeProfile ? meProfileBlob : memberProfileBlob;
    const profileImageObjectUrl = createProfileImageObjectUrl(profileImageBlob);
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
