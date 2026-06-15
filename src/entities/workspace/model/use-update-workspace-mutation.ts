'use client';

import { workspaceMutationKeys } from './workspace-mutation-keys';
import { workspaceQueryKeys } from './workspace-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { meWorkspacesQueryKeys } from '@entities/user';

import { updateWorkspace } from '../api';

import type { UpdateWorkspaceRequest } from './update-workspace.types';

type UseUpdateWorkspaceMutationProps = {
    workspaceId: string | number;
};

export function useUpdateWorkspaceMutation({ workspaceId }: UseUpdateWorkspaceMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: workspaceMutationKeys.update(workspaceId),
        mutationFn: (body: UpdateWorkspaceRequest) => updateWorkspace(workspaceId, body),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.detail(workspaceId) }),
                queryClient.invalidateQueries({ queryKey: meWorkspacesQueryKeys.all }),
            ]);
        },
    });
}
