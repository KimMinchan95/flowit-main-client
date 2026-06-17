export const inviteWorkspaceMemberMutationKeys = {
    all: ['invite-workspace-member'] as const,
    send: () => [...inviteWorkspaceMemberMutationKeys.all, 'send'] as const,
};
