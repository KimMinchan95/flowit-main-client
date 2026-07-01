'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkspaceTaskComment } from '../api';

import type { CreateWorkspaceTaskCommentRequest } from './create-workspace-task-comment.types';

type UseCreateWorkspaceTaskCommentMutationProps = {
    workspaceId: string | number;
    taskId: number;
};

export function useCreateWorkspaceTaskCommentMutation({
    workspaceId,
    taskId,
}: UseCreateWorkspaceTaskCommentMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.createComment(workspaceId, taskId),
        mutationFn: (body: CreateWorkspaceTaskCommentRequest) => createWorkspaceTaskComment(workspaceId, taskId, body),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.commentsRoot(workspaceId, taskId),
                }),
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.detail({ workspaceId, taskId }),
                }),
            ]);
        },
    });
}
