'use client';

import { useMeWorkspacesQuery } from '@entities/user';
import { findWorkspaceById } from '@entities/workspace';

export function useWorkspaceRouteAccess(workspaceId: string) {
    const query = useMeWorkspacesQuery();
    const workspace = findWorkspaceById(query.data?.items ?? [], workspaceId);

    return {
        isChecking: query.isPending,
        isAllowed: workspace !== undefined,
        isError: query.isError,
    };
}
