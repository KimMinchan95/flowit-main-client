import { apiRequest } from '@shared/api/http';

import type { GetWorkspaceTasksParams, WorkspaceTasksResponse } from '../model';

function buildWorkspaceTasksQuery(params?: GetWorkspaceTasksParams): string {
    if (!params) {
        return '';
    }

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            searchParams.set(key, String(value));
        }
    }

    const query = searchParams.toString();

    return query ? `?${query}` : '';
}

export function getWorkspaceTasks(workspaceId: string | number, params?: GetWorkspaceTasksParams) {
    return apiRequest<WorkspaceTasksResponse>(
        `/v1/workspaces/${workspaceId}/tasks${buildWorkspaceTasksQuery(params)}`,
        {
            method: 'GET',
        },
    );
}
