'use client';

import { useState } from 'react';

import { BoardContent } from './board-content';
import { BoardHeader } from './board-header';

import { CreateWorkspaceTaskModal } from '@features/create-workspace-task';
import { InviteWorkspaceMemberModal } from '@features/invite-workspace-member';
import { useUpdateWorkspaceTaskStatusMutation, useWorkspaceTasksQuery } from '@entities/task';
import { useWorkspaceQuery } from '@entities/workspace';

import { useModal } from '@shared/lib/hooks';

import type { TaskStatus } from '@entities/task';

type Props = {
    workspaceId: string;
};

export function WorkspaceBoardPage({ workspaceId }: Props) {
    const { open: isInviteModalOpen, onOpen: openInviteModal, onClose: closeInviteModal } = useModal();
    const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus | null>(null);
    const { mutate: updateTaskStatus } = useUpdateWorkspaceTaskStatusMutation({ workspaceId });

    const { data: workspace, isPending: isWorkspacePending } = useWorkspaceQuery({ workspaceId });
    const {
        data: tasksData,
        isPending: isTasksPending,
        isError: isTasksError,
    } = useWorkspaceTasksQuery({
        workspaceId,
        enabled: !!workspaceId,
    });

    const workspaceName = workspace?.name ?? (isWorkspacePending ? '…' : '');
    const isCreateTaskModalOpen = createTaskStatus !== null;

    const handleTaskStatusChange = (taskId: number, status: TaskStatus) => {
        updateTaskStatus({ taskId, status });
    };

    const openCreateTaskModal = (status: TaskStatus = 'TODO') => {
        setCreateTaskStatus(status);
    };

    const closeCreateTaskModal = () => {
        setCreateTaskStatus(null);
    };

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden p-8">
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
                onTaskStatusChange={handleTaskStatusChange}
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
