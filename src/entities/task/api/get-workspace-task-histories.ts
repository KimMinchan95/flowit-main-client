import { apiRequest } from '@shared/api/http';

import type {
    GetWorkspaceTaskHistoriesParams,
    GetWorkspaceTaskHistoriesResponse,
} from '../model/get-workspace-task-histories.types';

function buildWorkspaceTaskHistoriesQuery(params: Pick<GetWorkspaceTaskHistoriesParams, 'page' | 'size'>): string {
    const searchParams = new URLSearchParams();

    if (params.page !== undefined) {
        searchParams.set('page', String(params.page));
    }

    if (params.size !== undefined) {
        searchParams.set('size', String(params.size));
    }

    const query = searchParams.toString();

    return query ? `?${query}` : '';
}

export function getWorkspaceTaskHistories({ workspaceId, taskId, page, size }: GetWorkspaceTaskHistoriesParams) {
    return apiRequest<GetWorkspaceTaskHistoriesResponse>(
        `/v1/workspaces/${workspaceId}/tasks/${taskId}/histories${buildWorkspaceTaskHistoriesQuery({ page, size })}`,
        {
            method: 'GET',
        },
    );
}
