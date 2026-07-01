import { apiRequest } from '@shared/api/http';

import type { UpdateWorkspaceTaskRequest, UpdateWorkspaceTaskResponse } from '../model/update-workspace-task.types';

export function updateWorkspaceTask(
    workspaceId: string | number,
    taskId: string | number,
    body: UpdateWorkspaceTaskRequest,
) {
    return apiRequest<UpdateWorkspaceTaskResponse>(`/v1/workspaces/${workspaceId}/tasks/${taskId}`, {
        method: 'PATCH',
        body,
    });
}
