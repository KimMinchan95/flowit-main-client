'use client';

import { useEffect } from 'react';

import { useRouter } from '@shared/i18n';
import { AUTH_ROUTES } from '@shared/lib/auth';

import { useAuthSession } from '../model/use-auth-session';

export type AuthGateMode = 'guest' | 'protected' | 'redirect';

type AuthGateProps = {
    mode: AuthGateMode;
    children?: React.ReactNode;
};

export function AuthGate({ mode, children }: AuthGateProps) {
    const router = useRouter();
    const { accessToken, isSessionResolved } = useAuthSession();
    const hasToken = Boolean(accessToken);

    useEffect(() => {
        if (!isSessionResolved) {
            return;
        }

        if (mode === 'redirect') {
            router.replace(hasToken ? AUTH_ROUTES.WORKSPACES : AUTH_ROUTES.LOGIN);
            return;
        }

        if (mode === 'guest' && hasToken) {
            router.replace(AUTH_ROUTES.WORKSPACES);
            return;
        }

        if (mode === 'protected' && !accessToken) {
            router.replace(AUTH_ROUTES.LOGIN);
        }
    }, [accessToken, hasToken, isSessionResolved, mode, router]);

    if (mode === 'redirect') {
        return null;
    }

    if (!isSessionResolved) {
        return null;
    }

    if (mode === 'guest' && hasToken) {
        return null;
    }

    if (mode === 'protected' && !accessToken) {
        return null;
    }

    return children;
}
