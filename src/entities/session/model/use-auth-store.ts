'use client';

import { create } from 'zustand';

import { setAccessTokenProvider } from '@shared/lib/auth';

type AuthState = {
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    setAuth: (tokens: { accessToken: string }) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
    accessToken: null,
    setAccessToken: accessToken => set({ accessToken }),
    setAuth: ({ accessToken }) => set({ accessToken }),
    clearAuth: () => set({ accessToken: null }),
}));

setAccessTokenProvider(() => useAuthStore.getState().accessToken);
