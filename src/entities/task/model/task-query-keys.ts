import { createQueryKeys } from '@shared/api';

import type { GetWorkspaceTaskCommentsParams } from './get-workspace-task-comments.types';

const baseKeys = createQueryKeys('task');

export const taskQueryKeys = {
    ...baseKeys,
    commentsRoot: (workspaceId: string | number, taskId: number) =>
        [...baseKeys.all, 'comments', { workspaceId, taskId }] as const,
    comments: (params: GetWorkspaceTaskCommentsParams) =>
        [...taskQueryKeys.commentsRoot(params.workspaceId, params.taskId), params] as const,
};
