import { apiRequest } from '@shared/api/http';

import type { UpdateMePasswordRequest, UpdateMePasswordResponse } from '../model/update-me-password.types';

const UPDATE_ME_PASSWORD_PATH = '/v1/users/me/password';

export function updateMePassword(body: UpdateMePasswordRequest) {
    return apiRequest<UpdateMePasswordResponse>(UPDATE_ME_PASSWORD_PATH, {
        method: 'PATCH',
        body,
    });
}
