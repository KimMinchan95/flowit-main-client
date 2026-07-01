'use client';

import { useEffect, useState } from 'react';

import { TaskDetailHeader } from './task-detail-header';
import { TaskDetailView } from './task-detail-view';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { UpdateWorkspaceTaskModal } from '@features/update-workspace-task';
import { useWorkspaceTaskQuery } from '@entities/task';

import { cn } from '@shared/lib';

import { getTaskDetailErrorMessage } from '../lib/get-task-detail-error-message';

import type { TaskDetailViewMode } from './task-detail-view';

type WorkspaceTaskDetailModalProps = {
    workspaceId: string;
    taskId: number | null;
    open: boolean;
    onClose: () => void;
};

export function WorkspaceTaskDetailModal({ workspaceId, taskId, open, onClose }: WorkspaceTaskDetailModalProps) {
    const tDetail = useTranslations('board.taskDetail');
    const tErrors = useTranslations('board.taskDetailErrors');

    const [viewMode, setViewMode] = useState<TaskDetailViewMode>('side');
    const [isEditOpen, setIsEditOpen] = useState(false);

    const {
        data: task,
        isPending,
        isError,
        error,
    } = useWorkspaceTaskQuery({
        workspaceId,
        taskId,
        enabled: open && taskId !== null,
    });

    const handleClose = () => {
        setViewMode('side');
        setIsEditOpen(false);
        onClose();
    };

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setViewMode('side');
                setIsEditOpen(false);
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open, onClose]);

    const errorMessage = isError
        ? getTaskDetailErrorMessage({
              error,
              fallback: tDetail('loadFailed'),
              unknownError: tDetail('loadUnknownError'),
              getKnownErrorMessage: errorCode => tErrors(errorCode),
          })
        : null;

    if (!open) {
        return null;
    }

    const isCenter = viewMode === 'center';

    return createPortal(
        <>
            <button
                type="button"
                className="fixed inset-0 z-40 bg-slate-900/30"
                aria-label={tDetail('close')}
                onClick={handleClose}
            />
            <aside
                className={cn(
                    'fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300',
                    isCenter
                        ? 'top-1/2 left-1/2 h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                        : 'inset-y-0 right-0 w-full max-w-[520px] border-l border-slate-200/80',
                )}
                role="dialog"
                aria-modal="true"
                aria-label={task?.title ?? tDetail('title')}
            >
                {isPending ? (
                    <div className="flex flex-1 items-center justify-center">
                        <Loader2 className="size-6 animate-spin text-slate-400" />
                    </div>
                ) : null}

                {errorMessage ? (
                    <div className="flex flex-1 flex-col">
                        <div className="flex justify-end border-b border-slate-100 px-4 py-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-sm font-bold text-slate-400 hover:text-slate-600"
                            >
                                {tDetail('close')}
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center px-8">
                            <p className="text-sm font-medium text-rose-500">{errorMessage}</p>
                        </div>
                    </div>
                ) : null}

                {task ? (
                    <>
                        <TaskDetailHeader
                            workspaceId={workspaceId}
                            task={task}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onEdit={() => setIsEditOpen(true)}
                            onClose={handleClose}
                        />
                        <TaskDetailView workspaceId={workspaceId} task={task} viewMode={viewMode} />
                        <UpdateWorkspaceTaskModal
                            workspaceId={workspaceId}
                            task={task}
                            open={isEditOpen}
                            onClose={() => setIsEditOpen(false)}
                        />
                    </>
                ) : null}
            </aside>
        </>,
        document.body,
    );
}
