'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkspaceTaskStatus } from '../api';

import type { WorkspaceTasksResponse } from './task.types';
import type { UpdateWorkspaceTaskStatusParams } from './update-workspace-task-status.types';

type UseUpdateWorkspaceTaskStatusMutationProps = {
    workspaceId: string | number;
};

export function useUpdateWorkspaceTaskStatusMutation({ workspaceId }: UseUpdateWorkspaceTaskStatusMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.updateStatus(workspaceId),
        mutationFn: ({ taskId, status }: UpdateWorkspaceTaskStatusParams) =>
            updateWorkspaceTaskStatus(workspaceId, taskId, { status }),
        onMutate: async ({ taskId, status }) => {
            await queryClient.cancelQueries({ queryKey: taskQueryKeys.lists() });

            const previousQueries = queryClient.getQueriesData<WorkspaceTasksResponse>({
                queryKey: taskQueryKeys.lists(),
            });

            queryClient.setQueriesData<WorkspaceTasksResponse>({ queryKey: taskQueryKeys.lists() }, current =>
                current
                    ? {
                          ...current,
                          items: current.items.map(task => (task.id === taskId ? { ...task, status } : task)),
                      }
                    : current,
            );

            return { previousQueries };
        },
        onError: (_error, _variables, context) => {
            context?.previousQueries.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
        },
    });
}
