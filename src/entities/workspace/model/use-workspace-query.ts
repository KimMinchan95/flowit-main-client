'use client';

import { workspaceQueryKeys } from './workspace-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspace } from '../api';

type UseWorkspaceQueryProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceQuery({ workspaceId, enabled = true }: UseWorkspaceQueryProps) {
    return useQuery({
        queryKey: workspaceQueryKeys.detail(workspaceId),
        queryFn: () => getWorkspace(workspaceId),
        enabled,
    });
}
