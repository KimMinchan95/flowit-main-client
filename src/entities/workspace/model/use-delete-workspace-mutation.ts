'use client';

import { workspaceMutationKeys } from './workspace-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { deleteWorkspace } from '../api';

type UseDeleteWorkspaceMutationProps = {
    workspaceId: string | number;
};

export function useDeleteWorkspaceMutation({ workspaceId }: UseDeleteWorkspaceMutationProps) {
    return useMutation({
        mutationKey: workspaceMutationKeys.delete(workspaceId),
        mutationFn: () => deleteWorkspace(workspaceId),
    });
}
