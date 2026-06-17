'use client';

import { taskQueryKeys } from './task-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceTasks } from '../api';

import type { GetWorkspaceTasksParams } from './task.types';

type UseWorkspaceTasksQueryProps = {
    workspaceId: string | number;
    params?: GetWorkspaceTasksParams;
    enabled?: boolean;
};

export function useWorkspaceTasksQuery({ workspaceId, params, enabled = true }: UseWorkspaceTasksQueryProps) {
    return useQuery({
        queryKey: taskQueryKeys.list({ workspaceId, ...params }),
        queryFn: () => getWorkspaceTasks(workspaceId, params),
        enabled: enabled && Boolean(workspaceId),
    });
}
