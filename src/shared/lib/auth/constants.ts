export const REFRESH_TOKEN_COOKIE_NAME = 'flowit_refresh_token';

export const AUTH_ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    WORKSPACES: '/workspaces',
} as const;

export const AUTH_PUBLIC_PATHS = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.SIGNUP] as const;
