'use client';

import { useEffect, useState } from 'react';

import { queueRefreshAccessToken, useAuthStore } from '@entities/session';

export function useAuthSession() {
    const accessToken = useAuthStore(state => state.accessToken);
    const [isSessionResolved, setIsSessionResolved] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        (async function resolveSession() {
            await queueRefreshAccessToken();

            if (isCancelled) {
                return;
            }

            setIsSessionResolved(true);
        })();

        return () => {
            isCancelled = true;
        };
    }, []);

    return {
        accessToken,
        hasToken: Boolean(accessToken),
        isSessionResolved,
    };
}
