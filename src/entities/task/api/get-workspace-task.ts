import { apiRequest } from '@shared/api/http';

import type { TaskDetail } from '../model/task-detail.types';

export function getWorkspaceTask(workspaceId: string | number, taskId: string | number) {
    return apiRequest<TaskDetail>(`/v1/workspaces/${workspaceId}/tasks/${taskId}`, {
        method: 'GET',
    });
}
