'use client';

import { NotificationAvatar } from './notification-avatar';
import { NotificationMessage } from './notification-message';
import { X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { formatNotificationRelativeTime } from '../lib/format-notification-relative-time';

import type { Notification } from '../model/notification.types';

type NotificationToastContentProps = {
    notification: Notification;
};

export function NotificationToastContent({ notification }: NotificationToastContentProps) {
    const locale = useLocale();
    const t = useTranslations('notification');
    const relativeTime = formatNotificationRelativeTime(notification.occurredAt, locale, {
        justNow: t('justNow'),
    });

    return (
        <div className="relative w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
            <button
                type="button"
                onClick={() => toast.dismiss(`notification-${notification.id}`)}
                className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label={t('dismiss')}
            >
                <X size={14} strokeWidth={2.25} aria-hidden />
            </button>
            <div className="flex items-start gap-3 py-3.5 pr-10 pl-4">
                <NotificationAvatar notification={notification} size="md" className="mt-0.5" />
                <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold tracking-wide text-blue-600">{t('title')}</p>
                    <NotificationMessage notification={notification} variant="toast" />
                    <p className="mt-1.5 truncate text-[11px] text-slate-400">
                        {notification.scope.name} · {relativeTime}
                    </p>
                </div>
            </div>
        </div>
    );
}
