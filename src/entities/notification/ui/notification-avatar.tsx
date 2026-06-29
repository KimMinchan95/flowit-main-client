'use client';

import { MemberAvatar } from '@entities/member';

import type { Notification } from '../model/notification.types';

type NotificationAvatarProps = {
    notification: Notification;
    size?: 'sm' | 'md';
    className?: string;
};

export function NotificationAvatar({ notification, size = 'md', className }: NotificationAvatarProps) {
    const isWithdrawn = notification.type === 'WORKSPACE_MEMBER_WITHDRAWN';
    const name = isWithdrawn ? notification.subject.name : notification.actor.name?.trim() || '-';
    const profileImageUrl = isWithdrawn ? null : notification.actor.profileImageUrl;

    return <MemberAvatar name={name} profileImageUrl={profileImageUrl} size={size} className={className} />;
}
