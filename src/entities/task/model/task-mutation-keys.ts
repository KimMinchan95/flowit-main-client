export const taskMutationKeys = {
    all: ['task'] as const,
    create: (workspaceId: string | number) => [...taskMutationKeys.all, 'create', workspaceId] as const,
    updateProgress: (workspaceId: string | number) => [...taskMutationKeys.all, 'updateProgress', workspaceId] as const,
    updateStatus: (workspaceId: string | number) => [...taskMutationKeys.all, 'updateStatus', workspaceId] as const,
};
