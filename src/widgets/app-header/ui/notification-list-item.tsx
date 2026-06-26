'use client';

import { useLocale, useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import { formatNotificationRelativeTime, getNotificationMessageValues } from '@entities/notification';

import { cn } from '@shared/lib';

import type { Notification } from '@entities/notification';
import type { ReactNode } from 'react';

type NotificationListItemProps = {
    notification: Notification;
};

function renderBold(chunks: ReactNode) {
    return <span className="font-semibold text-slate-900">{chunks}</span>;
}

function NotificationMessage({ notification }: NotificationListItemProps) {
    const t = useTranslations('notification');
    const tTypes = useTranslations('notification.types');
    const values = getNotificationMessageValues(notification, t('unknownActor'));
    const messageClassName = cn(
        'line-clamp-3 text-[13px] leading-[1.45]',
        notification.read ? 'font-normal text-slate-500' : 'font-medium text-slate-800',
    );

    if (!tTypes.has(notification.type)) {
        return <p className={messageClassName}>{t('fallback')}</p>;
    }

    return (
        <p className={messageClassName}>
            {tTypes.rich(notification.type, {
                ...values,
                bold: renderBold,
            })}
        </p>
    );
}

export function NotificationListItem({ notification }: NotificationListItemProps) {
    const locale = useLocale();
    const t = useTranslations('notification');
    const isUnread = !notification.read;
    const isWithdrawn = notification.type === 'WORKSPACE_MEMBER_WITHDRAWN';
    const avatarName = isWithdrawn ? notification.subject.name : notification.actor.name?.trim() || '?';
    const avatarProfileImageUrl = isWithdrawn ? null : notification.actor.profileImageUrl;
    const relativeTime = formatNotificationRelativeTime(notification.occurredAt, locale, {
        justNow: t('justNow'),
    });

    return (
        <div
            className={cn(
                'group relative flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50/80',
                isUnread && 'bg-blue-50/30 hover:bg-blue-50/50',
            )}
        >
            {isUnread ? <span className="absolute top-2 left-2 size-1.5 rounded-full bg-blue-500" aria-hidden /> : null}
            <MemberAvatar
                name={avatarName}
                profileImageUrl={avatarProfileImageUrl}
                size="md"
                className={cn(isUnread && 'ring-2 ring-blue-400/60 ring-offset-2 ring-offset-white')}
            />
            <div className="min-w-0 flex-1 pt-0.5">
                <NotificationMessage notification={notification} />
                <span
                    className={cn(
                        'mt-1.5 block text-[11px] tracking-wide',
                        isUnread ? 'font-medium text-slate-500' : 'font-normal text-slate-400',
                    )}
                >
                    {relativeTime}
                </span>
            </div>
        </div>
    );
}
