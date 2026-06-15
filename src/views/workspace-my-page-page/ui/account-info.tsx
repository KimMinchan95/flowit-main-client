'use client';

import { PasswordEditModal } from './password-edit-modal';
import { useTranslations } from 'next-intl';

import { useMeUserQuery } from '@entities/user';

import { Button, Card } from '@shared/ui';
import { useModal } from '@shared/lib/hooks';

import type { ReactNode } from 'react';

const PASSWORD_MASK = '••••••••';

export function AccountInfo() {
    const tMyPage = useTranslations('myPage');
    const t = useTranslations('auth');

    const { data: meUser } = useMeUserQuery();
    const { open, onOpen, onClose } = useModal();

    return (
        <Card title={tMyPage('accountInfo')}>
            <div className="flex flex-col gap-6">
                <LabeledAccountInfo label={t('name')} value={meUser?.nickname} />
                <LabeledAccountInfo label={t('emailAccount')} value={meUser?.email} />
                <LabeledAccountInfo
                    label={t('password')}
                    value={
                        <div className="flex items-center gap-2">
                            <span className="inline-flex min-h-9 items-center leading-none">{PASSWORD_MASK}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="shrink-0 font-bold text-blue-600"
                                onClick={onOpen}
                            >
                                {t('passwordEdit')}
                            </Button>
                        </div>
                    }
                />
            </div>
            <PasswordEditModal open={open} onClose={onClose} />
        </Card>
    );
}

function LabeledAccountInfo({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="flex items-center justify-between font-bold text-slate-900">{value}</div>
        </div>
    );
}
