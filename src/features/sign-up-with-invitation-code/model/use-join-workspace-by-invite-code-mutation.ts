'use client';

import { joinWorkspaceByInviteCodeMutationKeys } from './join-workspace-by-invite-code-mutation-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { joinWorkspaceByInviteCode } from '@entities/member';
import { meWorkspacesQueryKeys } from '@entities/user';

import type { JoinWorkspaceByInviteCodeRequest } from '@entities/member/model';

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
