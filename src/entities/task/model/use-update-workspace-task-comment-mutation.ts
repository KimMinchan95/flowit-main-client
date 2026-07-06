'use client';

import { taskMutationKeys } from './task-mutation-keys';
import { taskQueryKeys } from './task-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkspaceTaskComment } from '../api';

import type { UpdateWorkspaceTaskCommentParams } from './update-workspace-task-comment.types';

type UseUpdateWorkspaceTaskCommentMutationProps = {
    workspaceId: string | number;
    taskId: number;
};

export function useUpdateWorkspaceTaskCommentMutation({
    workspaceId,
    taskId,
}: UseUpdateWorkspaceTaskCommentMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: taskMutationKeys.updateComment(workspaceId, taskId),
        mutationFn: ({ commentId, body }: UpdateWorkspaceTaskCommentParams) =>
            updateWorkspaceTaskComment(workspaceId, taskId, commentId, body),
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
