'use client';

import { NotificationList } from './notification-list';
import { Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
    flattenNotificationsPages,
    useMarkNotificationsReadAllMutation,
    useMarkNotificationsSeenMutation,
    useNotificationsInfiniteQuery,
    useNotificationsSummaryQuery,
} from '@entities/notification';

import { Button, Dropdown, DropdownMenu, DropdownTrigger, useDropdown } from '@shared/ui';
import { cn } from '@shared/lib';

function NotificationDropdownContent() {
    const t = useTranslations('notification');
    const { isOpen } = useDropdown();
    const { data: summary } = useNotificationsSummaryQuery();
    const { mutate: markNotificationsSeen } = useMarkNotificationsSeenMutation();
    const { mutate: markAllRead, isPending: isMarkingAllRead } = useMarkNotificationsReadAllMutation();
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useNotificationsInfiniteQuery({
        enabled: isOpen,
    });
    const { items, unreadCount } = flattenNotificationsPages(data);
    const hasUnseen = (summary?.unseenCount ?? 0) > 0;
    const hasUnread = unreadCount > 0;

    const handleOpenNotifications = () => {
        if (!isOpen) {
            markNotificationsSeen();
        }
    };

    return (
        <>
            <DropdownTrigger>
                <Button
                    iconOnly
                    onClick={handleOpenNotifications}
                    icon={
                        <span className="relative">
                            <Bell width={22} height={22} />
                            {hasUnseen ? (
                                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-red-500 shadow-sm" />
                            ) : null}
                        </span>
                    }
                    variant="ghost"
                    rounded="full"
                    size="sm"
                    className="p-2 text-slate-500 hover:text-slate-700"
                    aria-label={t('openNotifications')}
                    shadow={false}
                >
                    {t('openNotifications')}
                </Button>
            </DropdownTrigger>
            <DropdownMenu className="w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200/70 p-0 shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3.5">
                    <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">{t('title')}</h3>
                        {hasUnread ? (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700 tabular-nums">
                                {unreadCount}
                            </span>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        disabled={!hasUnread || isMarkingAllRead}
                        onClick={() => markAllRead()}
                        className={cn(
                            'rounded-lg px-2.5 py-1 text-[12px] font-semibold transition-colors',
                            'text-blue-600 hover:bg-blue-50',
                            'disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent',
                        )}
                    >
                        {t('markAllRead')}
                    </button>
                </div>
                <NotificationList
                    items={items}
                    isLoading={isFetching && !data}
                    hasMore={hasNextPage}
                    isLoadingMore={isFetchingNextPage}
                    onLoadMore={() => void fetchNextPage()}
                />
            </DropdownMenu>
        </>
    );
}

export function AppHeaderNotificationButton() {
    return (
        <Dropdown>
            <NotificationDropdownContent />
        </Dropdown>
    );
}
