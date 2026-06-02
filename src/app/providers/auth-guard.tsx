'use client';

import { useEffect, useState } from 'react';

import { queueRefreshAccessToken, useAuthStore } from '@entities/session';

import { usePathname, useRouter } from '@shared/i18n';
import { AUTH_ROUTES } from '@shared/lib/auth';

type AuthGuardProps = {
    children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
    const pathname = usePathname();
    const router = useRouter();
    const accessToken = useAuthStore(state => state.accessToken);
    const [sessionReadyPath, setSessionReadyPath] = useState<string | null>(null);
    const isSessionReady = sessionReadyPath === pathname;

    useEffect(() => {
        let isCancelled = false;

        const initializeSession = async () => {
            const existingAccessToken = useAuthStore.getState().accessToken;

            if (existingAccessToken) {
                if (!isCancelled) {
                    setSessionReadyPath(pathname);
                }

                return;
            }

            const refreshedAccessToken = await queueRefreshAccessToken();

            if (!refreshedAccessToken && !isCancelled) {
                router.replace(AUTH_ROUTES.LOGIN);
                return;
            }

            if (isCancelled) {
                return;
            }

            setSessionReadyPath(pathname);
        };

        initializeSession();

        return () => {
            isCancelled = true;
        };
    }, [pathname, router]);

    useEffect(() => {
        if (!isSessionReady) {
            return;
        }

        if (!accessToken) {
            router.replace(AUTH_ROUTES.LOGIN);
        }
    }, [accessToken, isSessionReady, router]);

    if (!isSessionReady) {
        return null;
    }

    return children;
}
