'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWorkspaceTaskComment } from '../api';

import type { DeleteWorkspaceTaskCommentParams } from './delete-workspace-task-comment.types';

type UseDeleteWorkspaceTaskCommentMutationProps = {
    workspaceId: string | number;
    taskId: number;
};

export function useDeleteWorkspaceTaskCommentMutation({
    workspaceId,
    taskId,
}: UseDeleteWorkspaceTaskCommentMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.deleteComment(workspaceId, taskId),
        mutationFn: ({ commentId }: DeleteWorkspaceTaskCommentParams) =>
            deleteWorkspaceTaskComment(workspaceId, taskId, commentId),
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
