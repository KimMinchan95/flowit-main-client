'use client';

import { NotificationListItem } from './notification-list-item';
import { Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Notification } from '@entities/notification';

type NotificationListProps = {
    items: Notification[];
    isLoading: boolean;
    isError?: boolean;
    errorMessage?: string | null;
    hasMore?: boolean;
    isLoadingMore?: boolean;
    onLoadMore?: () => void;
};

function NotificationListSkeleton() {
    return (
        <div className="divide-y divide-slate-100">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex animate-pulse items-start gap-3 px-4 py-3">
                    <div className="size-9 shrink-0 rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-2 pt-0.5">
                        <div className="h-3.5 w-full rounded-md bg-slate-100" />
                        <div className="h-3 w-2/5 rounded-md bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function NotificationListEmpty() {
    const t = useTranslations('notification');

    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Bell width={20} height={20} strokeWidth={1.75} />
            </div>
            <p className="text-[13px] font-medium text-slate-500">{t('empty')}</p>
        </div>
    );
}

export function NotificationList({
    items,
    isLoading,
    isError = false,
    errorMessage = null,
    hasMore = false,
    isLoadingMore = false,
    onLoadMore,
}: NotificationListProps) {
    const t = useTranslations('notification');

    if (isLoading) {
        return <NotificationListSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <p className="text-[13px] font-medium text-rose-500">{errorMessage ?? t('loadFailed')}</p>
            </div>
        );
    }

    if (items.length === 0) {
        return <NotificationListEmpty />;
    }

    return (
        <div className="flex flex-col">
            <div className="max-h-[min(400px,60vh)] divide-y divide-slate-100 overflow-y-auto overscroll-contain">
                {items.map(notification => (
                    <NotificationListItem key={notification.id} notification={notification} />
                ))}
            </div>
            {hasMore ? (
                <button
                    type="button"
                    onClick={onLoadMore}
                    disabled={isLoadingMore}
                    className="border-t border-slate-100 px-4 py-2.5 text-[12px] font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
                >
                    {isLoadingMore ? t('loadingMore') : t('loadMore')}
                </button>
            ) : null}
        </div>
    );
}
