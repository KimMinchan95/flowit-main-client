'use client';

import { Activity, AlertTriangle, Clock, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@shared/lib';

import type { WorkspaceTaskIndicatorsResponse } from '@entities/task';
import type { LucideIcon } from 'lucide-react';

type DashboardIndicatorCardsProps = {
    indicators?: WorkspaceTaskIndicatorsResponse;
    isPending: boolean;
    isError?: boolean;
    errorMessage?: string | null;
};

type IndicatorCardConfig = {
    key: 'total' | 'inProgress' | 'dueToday' | 'expired';
    valueKey: keyof WorkspaceTaskIndicatorsResponse;
    labelKey: 'total' | 'inProgress' | 'dueToday' | 'expired';
    descriptionKey: 'totalDescription' | 'inProgressDescription' | 'dueTodayDescription' | 'expiredDescription';
    icon: LucideIcon;
    iconClassName: string;
    valueClassName?: string;
    labelClassName?: string;
};

const INDICATOR_CARDS: IndicatorCardConfig[] = [
    {
        key: 'total',
        valueKey: 'total',
        labelKey: 'total',
        descriptionKey: 'totalDescription',
        icon: FileText,
        iconClassName: 'bg-blue-50 text-blue-600',
    },
    {
        key: 'inProgress',
        valueKey: 'inProgress',
        labelKey: 'inProgress',
        descriptionKey: 'inProgressDescription',
        icon: Activity,
        iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
        key: 'dueToday',
        valueKey: 'dueToday',
        labelKey: 'dueToday',
        descriptionKey: 'dueTodayDescription',
        icon: Clock,
        iconClassName: 'bg-orange-50 text-orange-600',
        valueClassName: 'text-orange-600',
        labelClassName: 'text-orange-600',
    },
    {
        key: 'expired',
        valueKey: 'expired',
        labelKey: 'expired',
        descriptionKey: 'expiredDescription',
        icon: AlertTriangle,
        iconClassName: 'bg-red-50 text-red-600',
        valueClassName: 'text-red-600',
        labelClassName: 'text-red-600',
    },
];

export function DashboardIndicatorCards({
    indicators,
    isPending,
    isError = false,
    errorMessage = null,
}: DashboardIndicatorCardsProps) {
    const t = useTranslations('dashboard.indicators');

    if (isError) {
        return (
            <div className="relative z-10 mb-12 flex min-h-[150px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white p-7 text-sm font-medium text-rose-500 shadow-sm">
                {errorMessage}
            </div>
        );
    }

    return (
        <div className="relative z-10 mb-12 grid shrink-0 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {INDICATOR_CARDS.map(card => {
                const Icon = card.icon;
                const value = isPending ? '…' : (indicators?.[card.valueKey] ?? 0);

                return (
                    <div
                        key={card.key}
                        className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <span
                                className={cn(
                                    'text-[15px] font-bold tracking-tight text-slate-600',
                                    card.labelClassName,
                                )}
                            >
                                {t(card.labelKey)}
                            </span>
                            <div
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-xl',
                                    card.iconClassName,
                                )}
                            >
                                <Icon size={18} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span
                                className={cn(
                                    'text-[40px] leading-none font-extrabold tracking-tight text-slate-900',
                                    card.valueClassName,
                                )}
                            >
                                {value}
                            </span>
                            <p className="mt-2 text-[13px] font-medium text-slate-400">{t(card.descriptionKey)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
