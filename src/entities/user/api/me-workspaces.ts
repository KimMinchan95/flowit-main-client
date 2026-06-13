import { apiRequest } from '@shared/api/http';

import type { MeWorkspacesResponse } from '../model/me-workspaces.types';

const ME_WORKSPACES_PATH = '/v1/users/me/workspaces';

export function meWorkspaces() {
    return apiRequest<MeWorkspacesResponse>(ME_WORKSPACES_PATH, {
        method: 'GET',
    });
}
