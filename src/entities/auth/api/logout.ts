import { apiRequest } from '@shared/api/http';

const LOGOUT_PATH = '/v1/public/auth/logout';

export function logout() {
    return apiRequest(LOGOUT_PATH, {
        method: 'POST',
    });
}
