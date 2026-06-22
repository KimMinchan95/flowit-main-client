export const taskMutationKeys = {
    all: ['task'] as const,
    create: (workspaceId: string | number) => [...taskMutationKeys.all, 'create', workspaceId] as const,
};
