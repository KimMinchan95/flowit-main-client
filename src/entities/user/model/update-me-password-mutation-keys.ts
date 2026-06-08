export const updateMePasswordMutationKeys = {
    all: ['update-me-password'] as const,
    update: () => [...updateMePasswordMutationKeys.all, 'update'] as const,
};
