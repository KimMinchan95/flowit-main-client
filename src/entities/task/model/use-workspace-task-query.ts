'use client';

import { taskQueryKeys } from './task-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceTask } from '../api';

type UseWorkspaceTaskQueryProps = {
    workspaceId: string | number;
    taskId: number | null;
    enabled?: boolean;
};

export function useWorkspaceTaskQuery({ workspaceId, taskId, enabled = true }: UseWorkspaceTaskQueryProps) {
    return useQuery({
        queryKey: taskQueryKeys.detail({ workspaceId, taskId }),
        queryFn: () => getWorkspaceTask(workspaceId, taskId!),
        enabled: enabled && Boolean(workspaceId) && taskId !== null,
    });
}
