import { apiRequest } from '@shared/api/http';

export function deleteWorkspace(workspaceId: string | number) {
    return apiRequest(`/v1/workspaces/${workspaceId}`, {
        method: 'DELETE',
    });
}
