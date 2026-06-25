export const notificationMutationKeys = {
    all: ['notification'] as const,
    markSeen: () => [...notificationMutationKeys.all, 'mark-seen'] as const,
    markReadAll: () => [...notificationMutationKeys.all, 'mark-read-all'] as const,
};
