export const workspaceMutationKeys = {
    all: ['workspace'] as const,
    update: (workspaceId: string | number) => [...workspaceMutationKeys.all, 'update', workspaceId] as const,
    delete: (workspaceId: string | number) => [...workspaceMutationKeys.all, 'delete', workspaceId] as const,
};
