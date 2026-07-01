'use client';

import { DEFAULT_WORKSPACE_TASK_HISTORIES_PAGE_SIZE } from './get-workspace-task-histories.types';
import { taskQueryKeys } from './task-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceTaskHistories } from '../api';

import type { GetWorkspaceTaskHistoriesParams } from './get-workspace-task-histories.types';

type UseWorkspaceTaskHistoriesQueryProps = GetWorkspaceTaskHistoriesParams & {
    enabled?: boolean;
};

export function useWorkspaceTaskHistoriesQuery({
    workspaceId,
    taskId,
    page = 0,
    size = DEFAULT_WORKSPACE_TASK_HISTORIES_PAGE_SIZE,
    enabled = true,
}: UseWorkspaceTaskHistoriesQueryProps) {
    return useQuery({
        queryKey: taskQueryKeys.histories({ workspaceId, taskId, page, size }),
        queryFn: () => getWorkspaceTaskHistories({ workspaceId, taskId, page, size }),
        enabled: enabled && Boolean(workspaceId) && Boolean(taskId),
    });
}
