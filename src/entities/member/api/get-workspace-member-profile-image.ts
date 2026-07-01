import { apiBlobRequest } from '@shared/api/http';

export function getWorkspaceMemberProfileImage(resolvedProfileImagePath: string) {
    return apiBlobRequest(resolvedProfileImagePath, {
        method: 'GET',
    });
}
