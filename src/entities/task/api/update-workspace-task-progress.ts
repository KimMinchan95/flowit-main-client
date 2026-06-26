import { apiRequest } from '@shared/api/http';

import type {
    UpdateWorkspaceTaskProgressRequest,
    UpdateWorkspaceTaskProgressResponse,
} from '../model/update-workspace-task-progress.types';

export function updateWorkspaceTaskProgress(
    workspaceId: string | number,
    taskId: number,
    body: UpdateWorkspaceTaskProgressRequest,
) {
    return apiRequest<UpdateWorkspaceTaskProgressResponse>(`/v1/workspaces/${workspaceId}/tasks/${taskId}/progress`, {
        method: 'PATCH',
        body,
    });
}
