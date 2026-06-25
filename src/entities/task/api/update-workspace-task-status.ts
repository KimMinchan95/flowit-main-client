import { apiRequest } from '@shared/api/http';

import type {
    UpdateWorkspaceTaskStatusRequest,
    UpdateWorkspaceTaskStatusResponse,
} from '../model/update-workspace-task-status.types';

export function updateWorkspaceTaskStatus(
    workspaceId: string | number,
    taskId: number,
    body: UpdateWorkspaceTaskStatusRequest,
) {
    return apiRequest<UpdateWorkspaceTaskStatusResponse>(`/v1/workspaces/${workspaceId}/tasks/${taskId}/status`, {
        method: 'PATCH',
        body,
    });
}
