'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkspaceTaskStatus } from '../api';

import type { TaskDetail } from './task-detail.types';
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
            await queryClient.cancelQueries({ queryKey: taskQueryKeys.details() });

            const previousQueries = queryClient.getQueriesData<WorkspaceTasksResponse>({
                queryKey: taskQueryKeys.lists(),
            });

            const previousDetail = queryClient.getQueryData<TaskDetail>(taskQueryKeys.detail({ workspaceId, taskId }));

            queryClient.setQueriesData<WorkspaceTasksResponse>({ queryKey: taskQueryKeys.lists() }, current =>
                current
                    ? {
                          ...current,
                          items: current.items.map(task => (task.id === taskId ? { ...task, status } : task)),
                      }
                    : current,
            );

            queryClient.setQueryData<TaskDetail>(taskQueryKeys.detail({ workspaceId, taskId }), current =>
                current ? { ...current, status } : current,
            );

            return { previousQueries, previousDetail };
        },
        onError: (_error, variables, context) => {
            context?.previousQueries.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });

            if (context?.previousDetail) {
                queryClient.setQueryData(
                    taskQueryKeys.detail({ workspaceId, taskId: variables.taskId }),
                    context.previousDetail,
                );
            }
        },
        onSettled: async (_data, _error, variables) => {
            await queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
            await queryClient.invalidateQueries({
                queryKey: taskQueryKeys.detail({ workspaceId, taskId: variables.taskId }),
            });
        },
    });
}
