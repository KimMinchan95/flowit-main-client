export const WORKSPACE_ROUTES = {
    list: '/workspaces',
    dashboard: (workspaceId: number | string) => `/workspaces/${workspaceId}/dashboard`,
    board: (workspaceId: number | string) => `/workspaces/${workspaceId}/board`,
    members: (workspaceId: number | string) => `/workspaces/${workspaceId}/members`,
    settings: (workspaceId: number | string) => `/workspaces/${workspaceId}/settings`,
    myPage: (workspaceId: number | string) => `/workspaces/${workspaceId}/my-page`,
} as const;
