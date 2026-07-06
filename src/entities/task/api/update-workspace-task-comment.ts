import { apiRequest } from '@shared/api/http';

import type {
    UpdateWorkspaceTaskCommentRequest,
    UpdateWorkspaceTaskCommentResponse,
} from '../model/update-workspace-task-comment.types';

export function updateWorkspaceTaskComment(
    workspaceId: string | number,
    taskId: number,
    commentId: number,
    body: UpdateWorkspaceTaskCommentRequest,
) {
    return apiRequest<UpdateWorkspaceTaskCommentResponse>(
        `/v1/workspaces/${workspaceId}/tasks/${taskId}/comments/${commentId}`,
        {
            method: 'PATCH',
            body,
        },
    );
}
