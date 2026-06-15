'use client';

import { useTranslations } from 'next-intl';

import { Button, Modal } from '@shared/ui';

import { getWorkspaceWithdrawErrorMessage } from '../lib';

type WorkspaceWithdrawModalProps = {
    open: boolean;
    workspaceName: string;
    isWithdrawing: boolean;
    error?: Error | null;
    onClose: () => void;
    onConfirm: () => void;
};

export function WorkspaceWithdrawModal({
    open,
    workspaceName,
    isWithdrawing,
    error,
    onClose,
    onConfirm,
}: WorkspaceWithdrawModalProps) {
    const t = useTranslations('settings');
    const tCommon = useTranslations('common');

    const submitErrorMessage = error
        ? getWorkspaceWithdrawErrorMessage({
              error,
              fallback: t('workspaceWithdrawFailed'),
              unknownError: t('workspaceWithdrawUnknownError'),
              getKnownErrorMessage: errorCode => t(`workspaceWithdrawErrors.${errorCode}`),
          })
        : null;

    return (
        <Modal
            open={open}
            title={t('workspaceWithdrawConfirmTitle')}
            onClose={onClose}
            footer={
                <div className="flex w-full gap-3">
                    <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={onClose}>
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        fullWidth
                        className="font-bold"
                        disabled={isWithdrawing}
                        onClick={onConfirm}
                    >
                        {isWithdrawing ? t('workspaceWithdrawing') : t('workspaceWithdrawButton')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-600">
                    {t('workspaceWithdrawConfirmDescription', { workspaceName })}
                </p>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
