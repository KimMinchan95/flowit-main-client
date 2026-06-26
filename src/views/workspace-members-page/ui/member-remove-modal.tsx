'use client';

import { useTranslations } from 'next-intl';

import { useRemoveWorkspaceMemberMutation } from '@entities/member';

import { Button, Modal } from '@shared/ui';
import { getMappedApiErrorMessage } from '@shared/api';

import { isMemberRemoveErrorCode } from '../model';

import type { WorkspaceMember } from '@entities/member';

type MemberRemoveModalProps = {
    open: boolean;
    workspaceId: string;
    member: WorkspaceMember;
    onClose: () => void;
};

export function MemberRemoveModal({ open, workspaceId, member, onClose }: MemberRemoveModalProps) {
    const t = useTranslations('members');
    const tCommon = useTranslations('common');

    const {
        mutate: removeMemberMutate,
        isPending,
        error,
        reset,
    } = useRemoveWorkspaceMemberMutation({
        workspaceId,
        memberId: member.memberId,
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleConfirm = () => {
        removeMemberMutate(undefined, {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const submitErrorMessage = error
        ? getMappedApiErrorMessage({
              error,
              fallback: t('removeMemberFailed'),
              unknownError: t('removeMemberUnknownError'),
              isKnownErrorCode: isMemberRemoveErrorCode,
              getKnownErrorMessage: errorCode => t(`removeMemberErrors.${errorCode}`),
          })
        : null;

    return (
        <Modal
            open={open}
            title={t('removeMemberTitle')}
            onClose={handleClose}
            footer={
                <div className="flex w-full gap-3">
                    <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={handleClose}>
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        fullWidth
                        className="font-bold"
                        disabled={isPending}
                        onClick={handleConfirm}
                    >
                        {isPending ? t('removingMember') : t('confirmRemove')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-600">
                    {t('removeMemberDescription', { name: member.name, email: member.email })}
                </p>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
