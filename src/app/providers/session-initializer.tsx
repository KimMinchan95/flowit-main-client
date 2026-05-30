'use client';

import { useEffect } from 'react';

import { refreshAccessToken } from '@entities/session';

export function SessionInitializer() {
    useEffect(() => {
        void refreshAccessToken();
    }, []);

    return null;
}
