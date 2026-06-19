'use client';

import { inviteWorkspaceMemberMutationKeys } from './invite-workspace-member-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { sendWorkspaceInviteEmailRequest } from '../api';

type InviteWorkspaceMemberVariables = {
    workspaceId: string;
    email: string;
    locale: string;
};

export function useInviteWorkspaceMemberMutation() {
    return useMutation({
        mutationKey: inviteWorkspaceMemberMutationKeys.send(),
        mutationFn: ({ workspaceId, email, locale }: InviteWorkspaceMemberVariables) =>
            sendWorkspaceInviteEmailRequest({ workspaceId, email, locale }),
    });
}
