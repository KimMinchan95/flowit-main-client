'use client';

import { DEFAULT_WORKSPACE_TASK_COMMENTS_PAGE_SIZE } from './get-workspace-task-comments.types';
import { taskQueryKeys } from './task-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceTaskComments } from '../api';

import type { GetWorkspaceTaskCommentsParams } from './get-workspace-task-comments.types';

type UseWorkspaceTaskCommentsQueryProps = GetWorkspaceTaskCommentsParams & {
    enabled?: boolean;
};

export function useWorkspaceTaskCommentsQuery({
    workspaceId,
    taskId,
    page = 0,
    size = DEFAULT_WORKSPACE_TASK_COMMENTS_PAGE_SIZE,
    enabled = true,
}: UseWorkspaceTaskCommentsQueryProps) {
    return useQuery({
        queryKey: taskQueryKeys.comments({ workspaceId, taskId, page, size }),
        queryFn: () => getWorkspaceTaskComments({ workspaceId, taskId, page, size }),
        enabled: enabled && Boolean(workspaceId) && Boolean(taskId),
    });
}
