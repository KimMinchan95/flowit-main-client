'use client';

import { logoutMutationKeys } from './logout-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { logout } from '@entities/auth';
import { clearAuthTokens } from '@entities/session';

export function useLogoutMutation() {
    return useMutation({
        mutationKey: logoutMutationKeys.logout(),
        mutationFn: () => logout(),
        onSuccess: () => {
            clearAuthTokens();
        },
    });
}
