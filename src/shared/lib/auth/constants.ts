export const REFRESH_TOKEN_COOKIE_NAME = 'flowit_refresh_token';

export const AUTH_PUBLIC_PATHS = ['/login', '/signup'] as const;

export const AUTH_ROUTES = {
    home: '/',
    login: '/login',
    signup: '/signup',
    workspaces: '/workspaces',
} as const;
