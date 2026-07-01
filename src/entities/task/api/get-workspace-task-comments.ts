import { apiRequest } from '@shared/api/http';

import type {
    GetWorkspaceTaskCommentsParams,
    GetWorkspaceTaskCommentsResponse,
} from '../model/get-workspace-task-comments.types';

function buildWorkspaceTaskCommentsQuery(params: Pick<GetWorkspaceTaskCommentsParams, 'page' | 'size'>): string {
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

export function getWorkspaceTaskComments({ workspaceId, taskId, page, size }: GetWorkspaceTaskCommentsParams) {
    return apiRequest<GetWorkspaceTaskCommentsResponse>(
        `/v1/workspaces/${workspaceId}/tasks/${taskId}/comments${buildWorkspaceTaskCommentsQuery({ page, size })}`,
        {
            method: 'GET',
        },
    );
}
