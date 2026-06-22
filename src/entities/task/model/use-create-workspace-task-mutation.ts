'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkspaceTask } from '../api';

import type { CreateWorkspaceTaskRequest } from './create-workspace-task.types';

type UseCreateWorkspaceTaskMutationProps = {
    workspaceId: string | number;
};

export function useCreateWorkspaceTaskMutation({ workspaceId }: UseCreateWorkspaceTaskMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.create(workspaceId),
        mutationFn: (body: CreateWorkspaceTaskRequest) => createWorkspaceTask(workspaceId, body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
        },
    });
}
