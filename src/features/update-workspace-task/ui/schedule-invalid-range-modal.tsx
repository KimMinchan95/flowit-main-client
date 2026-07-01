'use client';

import { useTranslations } from 'next-intl';

import { Button, Modal } from '@shared/ui';

type ScheduleInvalidRangeModalProps = {
    open: boolean;
    onClose: () => void;
};

export function ScheduleInvalidRangeModal({ open, onClose }: ScheduleInvalidRangeModalProps) {
    const t = useTranslations('board.updateTaskModal');

    return (
        <Modal
            open={open}
            title={t('scheduleInvalidRangeTitle')}
            onClose={onClose}
            className="max-w-md"
            overlayClassName="z-[70]"
            captureEscape
            footer={
                <Button variant="primary" size="sm" onClick={onClose}>
                    {t('scheduleInvalidRangeConfirm')}
                </Button>
            }
        >
            <p className="text-sm font-medium text-slate-600">{t('scheduleInvalidRangeDescription')}</p>
        </Modal>
    );
}
