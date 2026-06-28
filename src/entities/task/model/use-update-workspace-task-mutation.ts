'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkspaceTask } from '../api';

import type { UpdateWorkspaceTaskParams } from './update-workspace-task.types';

type UseUpdateWorkspaceTaskMutationProps = {
    workspaceId: string | number;
};

export function useUpdateWorkspaceTaskMutation({ workspaceId }: UseUpdateWorkspaceTaskMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.updateTask(workspaceId),
        mutationFn: ({ taskId, body }: UpdateWorkspaceTaskParams) => updateWorkspaceTask(workspaceId, taskId, body),
        onSuccess: async (_data, variables) => {
            await queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
            await queryClient.invalidateQueries({
                queryKey: taskQueryKeys.detail({ workspaceId, taskId: variables.taskId }),
            });
        },
    });
}
