export const taskMutationKeys = {
    all: ['task'] as const,
    create: (workspaceId: string | number) => [...taskMutationKeys.all, 'create', workspaceId] as const,
    createComment: (workspaceId: string | number, taskId: number) =>
        [...taskMutationKeys.all, 'createComment', workspaceId, taskId] as const,
    updateProgress: (workspaceId: string | number) => [...taskMutationKeys.all, 'updateProgress', workspaceId] as const,
    updateStatus: (workspaceId: string | number) => [...taskMutationKeys.all, 'updateStatus', workspaceId] as const,
    updateTask: (workspaceId: string | number) => [...taskMutationKeys.all, 'updateTask', workspaceId] as const,
};
