'use client';

import { useState } from 'react';

import { BoardContent } from './board-content';
import { BoardHeader } from './board-header';
import { useQueryClient } from '@tanstack/react-query';

import { CreateWorkspaceTaskModal } from '@features/create-workspace-task';
import { InviteWorkspaceMemberModal } from '@features/invite-workspace-member';
import { taskQueryKeys, useWorkspaceTasksQuery } from '@entities/task';
import { useWorkspaceQuery } from '@entities/workspace';

import { useModal } from '@shared/lib/hooks';

import type { Task, TaskStatus } from '@entities/task';

const BOARD_TASKS_PAGE_SIZE = 100;
const BOARD_TASKS_QUERY_PARAMS = { page: 0, size: BOARD_TASKS_PAGE_SIZE } as const;

type Props = {
    workspaceId: string;
};

export function WorkspaceBoardPage({ workspaceId }: Props) {
    const queryClient = useQueryClient();
    const { open: isInviteModalOpen, onOpen: openInviteModal, onClose: closeInviteModal } = useModal();
    const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus | null>(null);

    const { data: workspace, isPending: isWorkspacePending } = useWorkspaceQuery({ workspaceId });
    const {
        data: tasksData,
        isPending: isTasksPending,
        isError: isTasksError,
    } = useWorkspaceTasksQuery({
        workspaceId,
        params: BOARD_TASKS_QUERY_PARAMS,
        enabled: !!workspaceId,
    });

    const workspaceName = workspace?.name ?? (isWorkspacePending ? '…' : '');
    const tasksQueryKey = taskQueryKeys.list({ workspaceId, ...BOARD_TASKS_QUERY_PARAMS });
    const isCreateTaskModalOpen = createTaskStatus !== null;

    const handleTasksChange = (updatedTasks: Task[]) => {
        queryClient.setQueryData(tasksQueryKey, previous =>
            previous ? { ...previous, items: updatedTasks } : previous,
        );
    };

    const openCreateTaskModal = (status: TaskStatus = 'TODO') => {
        setCreateTaskStatus(status);
    };

    const closeCreateTaskModal = () => {
        setCreateTaskStatus(null);
    };

    return (
        <div className="flex min-h-full flex-col p-8">
            <BoardHeader
                workspaceId={workspaceId}
                workspaceName={workspaceName}
                onCreateTask={() => openCreateTaskModal()}
                onInviteMembers={openInviteModal}
            />
            <BoardContent
                isPending={isTasksPending}
                isError={isTasksError}
                tasks={tasksData?.items ?? []}
                onTasksChange={handleTasksChange}
                onAddTask={openCreateTaskModal}
            />
            <InviteWorkspaceMemberModal workspaceId={workspaceId} open={isInviteModalOpen} onClose={closeInviteModal} />
            <CreateWorkspaceTaskModal
                workspaceId={workspaceId}
                open={isCreateTaskModalOpen}
                initialStatus={createTaskStatus ?? 'TODO'}
                onClose={closeCreateTaskModal}
            />
        </div>
    );
}
