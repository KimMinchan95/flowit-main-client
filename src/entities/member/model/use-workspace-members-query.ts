'use client';

import { memberQueryKeys } from './member-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceMembers } from '../api';

type UseWorkspaceMembersQueryProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceMembersQuery({ workspaceId, enabled = true }: UseWorkspaceMembersQueryProps) {
    const normalizedWorkspaceId = String(workspaceId);

    return useQuery({
        queryKey: memberQueryKeys.list(normalizedWorkspaceId),
        queryFn: () => getWorkspaceMembers(normalizedWorkspaceId),
        enabled: enabled && Boolean(workspaceId),
    });
}
