'use client';

import { useEffect } from 'react';

import { queueRefreshAccessToken, useAuthStore } from '@entities/session';

import { useRouter } from '@shared/i18n';
import { AUTH_ROUTES } from '@shared/lib/auth';

export function HomeRedirect() {
    const router = useRouter();

    useEffect(() => {
        let isCancelled = false;

        const resolveRedirect = async () => {
            let token = useAuthStore.getState().accessToken;

            if (!token) {
                token = await queueRefreshAccessToken();
            }

            if (isCancelled) {
                return;
            }

            router.replace(token ? AUTH_ROUTES.WORKSPACES : AUTH_ROUTES.LOGIN);
        };

        void resolveRedirect();

        return () => {
            isCancelled = true;
        };
    }, [router]);

    return null;
}
