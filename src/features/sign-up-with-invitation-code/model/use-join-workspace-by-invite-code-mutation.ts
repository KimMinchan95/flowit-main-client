'use client';

import { joinWorkspaceByInviteCodeMutationKeys } from './join-workspace-by-invite-code-mutation-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { meWorkspacesQueryKeys } from '@entities/user';
import { joinWorkspaceByInviteCode } from '@entities/workspace';

import type { JoinWorkspaceByInviteCodeRequest } from '@entities/workspace';

export function useJoinWorkspaceByInviteCodeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: joinWorkspaceByInviteCodeMutationKeys.join(),
        mutationFn: (body: JoinWorkspaceByInviteCodeRequest) => joinWorkspaceByInviteCode(body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: meWorkspacesQueryKeys.all });
        },
    });
}
