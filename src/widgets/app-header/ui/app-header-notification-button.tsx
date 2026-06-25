'use client';

import { useEffect } from 'react';

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

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        markNotificationsSeen();
    }, [isOpen, markNotificationsSeen]);

    return (
        <>
            <DropdownTrigger>
                <Button
                    iconOnly
                    icon={
                        <span className="relative">
                            <Bell width={22} height={22} />
                            {hasUnseen ? (
                                <span className="absolute top-0 right-0 size-2 rounded-full border-2 border-white bg-red-500" />
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
            <DropdownMenu className="w-[320px] rounded-2xl border border-slate-200/80 p-5 shadow-xl">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-[15px] font-bold text-slate-900">{t('title')}</h3>
                    <button
                        type="button"
                        disabled={!hasUnread || isMarkingAllRead}
                        onClick={() => markAllRead()}
                        className="text-[13px] font-semibold text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-300 disabled:no-underline"
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
