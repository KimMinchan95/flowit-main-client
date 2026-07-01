'use client';

import { UpdateTaskForm } from './update-task-form';
import { useTranslations } from 'next-intl';

import { Modal } from '@shared/ui';

import type { TaskDetail } from '@entities/task';

type UpdateWorkspaceTaskModalProps = {
    workspaceId: string;
    task: TaskDetail;
    open: boolean;
    onClose: () => void;
};

export function UpdateWorkspaceTaskModal({ workspaceId, task, open, onClose }: UpdateWorkspaceTaskModalProps) {
    const t = useTranslations('board.updateTaskModal');

    return (
        <Modal
            open={open}
            title={t('title')}
            onClose={onClose}
            className="max-w-5xl"
            overlayClassName="z-[60] overflow-hidden"
            bodyClassName="flex flex-col overflow-hidden py-0"
        >
            {open ? <UpdateTaskForm key={task.id} workspaceId={workspaceId} task={task} onClose={onClose} /> : null}
        </Modal>
    );
}
