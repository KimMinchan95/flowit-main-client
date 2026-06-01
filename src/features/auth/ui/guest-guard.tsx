'use client';

import { useEffect, useState } from 'react';

import { queueRefreshAccessToken, useAuthStore } from '@entities/session';

import { useRouter } from '@shared/i18n';
import { AUTH_ROUTES } from '@shared/lib/auth';

type GuestGuardProps = {
    children: React.ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
    const router = useRouter();
    const [isGuestReady, setIsGuestReady] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const verifyGuest = async () => {
            let token = useAuthStore.getState().accessToken;

            if (!token) {
                token = await queueRefreshAccessToken();
            }

            if (isCancelled) {
                return;
            }

            if (token) {
                router.replace(AUTH_ROUTES.workspaces);
                return;
            }

            setIsGuestReady(true);
        };

        void verifyGuest();

        return () => {
            isCancelled = true;
        };
    }, [router]);

    if (!isGuestReady) {
        return null;
    }

    return children;
}
