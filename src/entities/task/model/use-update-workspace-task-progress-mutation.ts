'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkspaceTaskProgress } from '../api';

import type { UpdateWorkspaceTaskProgressParams } from './update-workspace-task-progress.types';

type UseUpdateWorkspaceTaskProgressMutationProps = {
    workspaceId: string | number;
};

export function useUpdateWorkspaceTaskProgressMutation({ workspaceId }: UseUpdateWorkspaceTaskProgressMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.updateProgress(workspaceId),
        mutationFn: ({ taskId, progress }: UpdateWorkspaceTaskProgressParams) =>
            updateWorkspaceTaskProgress(workspaceId, taskId, { progress }),
        onSuccess: async (_data, variables) => {
            await queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
            await queryClient.invalidateQueries({
                queryKey: taskQueryKeys.detail({ workspaceId, taskId: variables.taskId }),
            });
        },
    });
}
