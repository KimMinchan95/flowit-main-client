'use client';

import { MemberAvatar } from '@entities/member';

import type { Notification } from '../model/notification.types';

type NotificationAvatarProps = {
    notification: Notification;
    size?: 'sm' | 'md';
    className?: string;
};

export function NotificationAvatar({ notification, size = 'md', className }: NotificationAvatarProps) {
    const { displayName, profileImageUrl } = notification.profile;

    return (
        <MemberAvatar name={displayName ?? ''} profileImageUrl={profileImageUrl} size={size} className={className} />
    );
}
