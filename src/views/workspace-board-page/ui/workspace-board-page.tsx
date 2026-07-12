'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { BoardContent } from './board-content';
import { BoardHeader } from './board-header';
import { useTranslations } from 'next-intl';

import { CreateWorkspaceTaskModal } from '@features/create-workspace-task';
import { InviteWorkspaceMemberModal } from '@features/invite-workspace-member';
import { WorkspaceTaskDetailModal } from '@features/view-workspace-task';
import {
    isGetWorkspaceTasksErrorCode,
    isUpdateWorkspaceTaskStatusErrorCode,
    useUpdateWorkspaceTaskStatusMutation,
    useWorkspaceTasksQuery,
} from '@entities/task';
import { useWorkspaceQuery } from '@entities/workspace';

import { usePathname, useRouter } from '@shared/i18n';
import { getMappedApiErrorMessage } from '@shared/api';
import { useModal } from '@shared/lib/hooks';

import type { TaskStatus } from '@entities/task';
import type { ReadonlyURLSearchParams } from 'next/navigation';

type Props = {
    workspaceId: string;
};

function parseTaskIdFromSearchParams(searchParams: ReadonlyURLSearchParams): number | null {
    const taskIdParam = searchParams.get('taskId');
    if (!taskIdParam) {
        return null;
    }

    const taskId = Number(taskIdParam);
    return Number.isFinite(taskId) && taskId > 0 ? taskId : null;
}

export function WorkspaceBoardPage({ workspaceId }: Props) {
    const tBoard = useTranslations('board');
    const tErrors = useTranslations('board.updateTaskStatusErrors');
    const tLoadErrors = useTranslations('board.loadErrors');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { open: isInviteModalOpen, onOpen: openInviteModal, onClose: closeInviteModal } = useModal();
    const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus | null>(null);
    const [clickedTaskId, setClickedTaskId] = useState<number | null>(null);
    const urlTaskId = parseTaskIdFromSearchParams(searchParams);
    const selectedTaskId = clickedTaskId ?? urlTaskId;
    const {
        mutate: updateTaskStatus,
        error: statusError,
        reset: resetStatusError,
    } = useUpdateWorkspaceTaskStatusMutation({ workspaceId });

    const { data: workspace, isPending: isWorkspacePending } = useWorkspaceQuery({ workspaceId });
    const {
        data: tasksData,
        isPending: isTasksPending,
        isError: isTasksError,
        error: tasksError,
    } = useWorkspaceTasksQuery({
        workspaceId,
        enabled: !!workspaceId,
    });

    const workspaceName = workspace?.name ?? (isWorkspacePending ? '…' : '');
    const isCreateTaskModalOpen = createTaskStatus !== null;

    const handleTaskStatusChange = (taskId: number, status: TaskStatus) => {
        resetStatusError();
        updateTaskStatus({ taskId, status });
    };

    const openCreateTaskModal = (status: TaskStatus = 'TODO') => {
        setCreateTaskStatus(status);
    };

    const closeCreateTaskModal = () => {
        setCreateTaskStatus(null);
    };

    const closeTaskDetailModal = () => {
        setClickedTaskId(null);

        if (!searchParams.has('taskId')) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.delete('taskId');
        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname);
    };

    const statusErrorMessage = statusError
        ? getMappedApiErrorMessage({
              error: statusError,
              fallback: tBoard('updateTaskStatusFailed'),
              unknownError: tBoard('updateTaskStatusUnknownError'),
              isKnownErrorCode: isUpdateWorkspaceTaskStatusErrorCode,
              getKnownErrorMessage: errorCode => tErrors(errorCode),
          })
        : null;

    const tasksErrorMessage = isTasksError
        ? getMappedApiErrorMessage({
              error: tasksError,
              fallback: tBoard('loadFailed'),
              unknownError: tBoard('loadUnknownError'),
              isKnownErrorCode: isGetWorkspaceTasksErrorCode,
              getKnownErrorMessage: errorCode => tLoadErrors(errorCode),
          })
        : null;

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden p-8">
            <BoardHeader
                workspaceId={workspaceId}
                workspaceName={workspaceName}
                onCreateTask={() => openCreateTaskModal()}
                onInviteMembers={openInviteModal}
            />
            {statusErrorMessage ? <p className="mb-3 text-sm font-bold text-rose-500">{statusErrorMessage}</p> : null}
            <BoardContent
                isPending={isTasksPending}
                isError={isTasksError}
                errorMessage={tasksErrorMessage}
                tasks={tasksData?.items ?? []}
                onTaskStatusChange={handleTaskStatusChange}
                onAddTask={openCreateTaskModal}
                onTaskClick={task => setClickedTaskId(task.id)}
            />
            <InviteWorkspaceMemberModal workspaceId={workspaceId} open={isInviteModalOpen} onClose={closeInviteModal} />
            <CreateWorkspaceTaskModal
                workspaceId={workspaceId}
                open={isCreateTaskModalOpen}
                initialStatus={createTaskStatus ?? 'TODO'}
                onClose={closeCreateTaskModal}
            />
            <WorkspaceTaskDetailModal
                workspaceId={workspaceId}
                taskId={selectedTaskId}
                open={selectedTaskId !== null}
                onClose={closeTaskDetailModal}
            />
        </div>
    );
}
