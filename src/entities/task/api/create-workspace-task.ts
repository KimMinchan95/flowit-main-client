import { apiRequest } from '@shared/api/http';

import type { CreateWorkspaceTaskRequest, CreateWorkspaceTaskResponse } from '../model/create-workspace-task.types';

export function createWorkspaceTask(workspaceId: string | number, body: CreateWorkspaceTaskRequest) {
    return apiRequest<CreateWorkspaceTaskResponse>(`/v1/workspaces/${workspaceId}/tasks`, {
        method: 'POST',
        body,
    });
}
