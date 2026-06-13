'use client';

import { useWorkspaceQuery } from '@entities/workspace';

type UseWorkspaceByIdProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceById({ workspaceId, enabled = true }: UseWorkspaceByIdProps) {
    const { data: workspace, isPending, isError } = useWorkspaceQuery({ workspaceId, enabled });

    return {
        workspace,
        name: workspace?.name ?? (isPending ? '…' : undefined),
        isPending,
        isError,
    };
}
