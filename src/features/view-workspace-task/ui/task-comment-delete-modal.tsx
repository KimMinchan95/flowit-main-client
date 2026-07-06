'use client';

import { useTranslations } from 'next-intl';

import { isDeleteWorkspaceTaskCommentErrorCode, useDeleteWorkspaceTaskCommentMutation } from '@entities/task';

import { Button, Modal } from '@shared/ui';
import { getMappedApiErrorMessage } from '@shared/api';

import type { TaskComment } from '@entities/task';

type TaskCommentDeleteModalProps = {
    open: boolean;
    workspaceId: string | number;
    taskId: number;
    comment: TaskComment;
    onClose: () => void;
    onDeleted?: () => void;
};

export function TaskCommentDeleteModal({
    open,
    workspaceId,
    taskId,
    comment,
    onClose,
    onDeleted,
}: TaskCommentDeleteModalProps) {
    const t = useTranslations('board.taskDetail');
    const tBoard = useTranslations('board');
    const tDeleteErrors = useTranslations('board.deleteCommentErrors');
    const tCommon = useTranslations('common');

    const {
        mutate: deleteCommentMutate,
        isPending,
        error,
        reset,
    } = useDeleteWorkspaceTaskCommentMutation({ workspaceId, taskId });

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleConfirm = () => {
        deleteCommentMutate(
            { commentId: comment.id },
            {
                onSuccess: () => {
                    onDeleted?.();
                    handleClose();
                },
            },
        );
    };

    const submitErrorMessage = error
        ? getMappedApiErrorMessage({
              error,
              fallback: tBoard('deleteCommentFailed'),
              unknownError: tBoard('deleteCommentUnknownError'),
              isKnownErrorCode: isDeleteWorkspaceTaskCommentErrorCode,
              getKnownErrorMessage: errorCode => tDeleteErrors(errorCode),
          })
        : null;

    return (
        <Modal
            open={open}
            title={t('commentDeleteTitle')}
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
                        {isPending ? t('commentDeleteDeleting') : t('commentDeleteConfirm')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-600">{t('commentDeleteDescription')}</p>
                {submitErrorMessage ? <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p> : null}
            </div>
        </Modal>
    );
}
