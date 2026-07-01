import { apiRequest } from '@shared/api/http';

import type {
    CreateWorkspaceTaskCommentRequest,
    CreateWorkspaceTaskCommentResponse,
} from '../model/create-workspace-task-comment.types';

export function createWorkspaceTaskComment(
    workspaceId: string | number,
    taskId: number,
    body: CreateWorkspaceTaskCommentRequest,
) {
    return apiRequest<CreateWorkspaceTaskCommentResponse>(`/v1/workspaces/${workspaceId}/tasks/${taskId}/comments`, {
        method: 'POST',
        body,
    });
}
