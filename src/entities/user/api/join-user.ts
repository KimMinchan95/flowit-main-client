import { apiRequest } from '@shared/api/http';

import type { JoinUserData, JoinUserRequest } from '../model/join-user.types';

export function joinUser(body: JoinUserRequest) {
    return apiRequest<JoinUserData>('/v1/public/users/join', {
        method: 'POST',
        body,
    });
}
