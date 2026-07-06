import { apiRequest } from '@shared/api/http';

import type { DeleteWorkspaceTaskCommentResponse } from '../model/delete-workspace-task-comment.types';

export function deleteWorkspaceTaskComment(workspaceId: string | number, taskId: number, commentId: number) {
    return apiRequest<DeleteWorkspaceTaskCommentResponse>(
        `/v1/workspaces/${workspaceId}/tasks/${taskId}/comments/${commentId}`,
        {
            method: 'DELETE',
        },
    );
}
