import { apiRequest } from '@shared/api/http';

import type { WorkspaceDetail } from '../model/workspace-detail.types';

export function getWorkspace(workspaceId: string | number) {
    return apiRequest<WorkspaceDetail>(`/v1/workspaces/${workspaceId}`, {
        method: 'GET',
    });
}
