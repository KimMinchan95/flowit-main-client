'use client';

import { useAuthStore } from '../model/use-auth-store';

import type { SaveAccessTokenParams } from '../model/auth.types';

export function saveAccessToken({ accessToken }: SaveAccessTokenParams) {
    useAuthStore.getState().setAccessToken(accessToken);
}

export function clearAuthTokens() {
    useAuthStore.getState().clearAuth();
}
