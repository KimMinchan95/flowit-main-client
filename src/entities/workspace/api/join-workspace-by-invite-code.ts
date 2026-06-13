import { apiRequest } from '@shared/api/http';

import type {
    JoinWorkspaceByInviteCodeRequest,
    JoinWorkspaceByInviteCodeResponse,
} from '../model/join-workspace-by-invite-code.types';

const JOIN_WORKSPACE_BY_INVITE_CODE_PATH = '/v1/workspaces/join-requests/invite-code';

export function joinWorkspaceByInviteCode(body: JoinWorkspaceByInviteCodeRequest) {
    return apiRequest<JoinWorkspaceByInviteCodeResponse>(JOIN_WORKSPACE_BY_INVITE_CODE_PATH, {
        method: 'POST',
        body,
    });
}
