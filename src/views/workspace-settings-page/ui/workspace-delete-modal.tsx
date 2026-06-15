'use client';

import { useTranslations } from 'next-intl';

import { Button, Modal } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';

type WorkspaceDeleteModalProps = {
    open: boolean;
    workspaceName: string;
    isDeleting: boolean;
    error?: Error | null;
    onClose: () => void;
    onConfirm: () => void;
};

export function WorkspaceDeleteModal({
    open,
    workspaceName,
    isDeleting,
    error,
    onClose,
    onConfirm,
}: WorkspaceDeleteModalProps) {
    const t = useTranslations('settings');
    const tCommon = useTranslations('common');

    const submitErrorMessage = error ? getApiErrorMessage(error, t('workspaceDeleteFailed')) : null;

    return (
        <Modal
            open={open}
            title={t('workspaceDeleteConfirmTitle')}
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
                        disabled={isDeleting}
                        onClick={onConfirm}
                    >
                        {isDeleting ? t('workspaceDeleting') : t('workspaceDeleteButton')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-600">
                    {t('workspaceDeleteConfirmDescription', { workspaceName })}
                </p>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
