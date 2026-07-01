'use client';

import { CreateTaskForm } from './create-task-form';
import { useTranslations } from 'next-intl';

import { Modal } from '@shared/ui';

import type { TaskStatus } from '@entities/task';

type CreateWorkspaceTaskModalProps = {
    workspaceId: string;
    open: boolean;
    initialStatus: TaskStatus;
    onClose: () => void;
};

export function CreateWorkspaceTaskModal({ workspaceId, open, initialStatus, onClose }: CreateWorkspaceTaskModalProps) {
    const t = useTranslations('board.createTaskModal');
    const formKey = `${workspaceId}-${initialStatus}`;

    return (
        <Modal
            open={open}
            title={t('title')}
            onClose={onClose}
            className="max-w-5xl"
            overlayClassName="overflow-hidden"
            bodyClassName="flex flex-col overflow-hidden py-0"
        >
            {open ? (
                <CreateTaskForm
                    key={formKey}
                    workspaceId={workspaceId}
                    initialStatus={initialStatus}
                    onClose={onClose}
                />
            ) : null}
        </Modal>
    );
}
