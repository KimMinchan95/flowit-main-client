export const logoutMutationKeys = {
    all: ['logout'] as const,
    logout: () => [...logoutMutationKeys.all, 'logout'] as const,
};
