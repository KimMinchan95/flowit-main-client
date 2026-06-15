import { apiRequest } from '@shared/api/http';

import type { UpdateWorkspaceRequest, UpdateWorkspaceResponse } from '../model/update-workspace.types';

export function updateWorkspace(workspaceId: string | number, body: UpdateWorkspaceRequest) {
    return apiRequest<UpdateWorkspaceResponse>(`/v1/workspaces/${workspaceId}`, {
        method: 'PATCH',
        body,
    });
}
