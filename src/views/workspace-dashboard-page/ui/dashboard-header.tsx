'use client';

import { useTranslations } from 'next-intl';

import './dashboard-header.css';

type DashboardHeaderProps = {
    userName: string;
    isPending: boolean;
};

export function DashboardHeader({ userName, isPending }: DashboardHeaderProps) {
    const t = useTranslations('dashboard');
    const displayName = isPending ? '…' : userName;

    return (
        <div className="dashboard-header relative z-10 mb-12 shrink-0 pt-6">
            <h1 className="mb-1 text-[32px] font-bold tracking-tight text-slate-900">
                <span className="dashboard-header-title-inner">
                    {t.rich('greeting', {
                        name: displayName,
                        highlight: chunks => <span className="dashboard-header-name">{chunks}</span>,
                    })}{' '}
                    <span className="dashboard-header-wave" aria-hidden="true">
                        👋
                    </span>
                </span>
            </h1>
            <p className="dashboard-header-subtitle text-[16px] font-medium text-slate-500">{t('subtitle')}</p>
        </div>
    );
}
