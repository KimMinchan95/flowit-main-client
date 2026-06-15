export const memberMutationKeys = {
    all: ['member'] as const,
    withdraw: (workspaceId: string | number) => [...memberMutationKeys.all, 'withdraw', workspaceId] as const,
};
