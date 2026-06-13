export const joinWorkspaceByInviteCodeMutationKeys = {
    all: ['workspace', 'join-by-invite-code'] as const,
    join: () => [...joinWorkspaceByInviteCodeMutationKeys.all, 'join'] as const,
};
