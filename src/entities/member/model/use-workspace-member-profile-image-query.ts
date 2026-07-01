'use client';

import { memberQueryKeys } from './member-query-keys';
import { useQuery } from '@tanstack/react-query';

import { ApiError } from '@shared/api/http';
import { resolveApiResourcePath } from '@shared/api/http/resolve-api-resource-path';

import { getWorkspaceMemberProfileImage } from '../api';

type UseWorkspaceMemberProfileImageQueryProps = {
    profileImageUrl?: string | null;
    enabled?: boolean;
};

export function useWorkspaceMemberProfileImageQuery({
    profileImageUrl,
    enabled = true,
}: UseWorkspaceMemberProfileImageQueryProps) {
    const resolvedProfileImageUrl = profileImageUrl ? resolveApiResourcePath(profileImageUrl) : null;
    const hasProfileImage = Boolean(resolvedProfileImageUrl);

    return useQuery({
        queryKey: memberQueryKeys.detail(['profile-image', resolvedProfileImageUrl ?? 'none']),
        queryFn: () => getWorkspaceMemberProfileImage(resolvedProfileImageUrl!),
        enabled: enabled && hasProfileImage,
        staleTime: Infinity,
        retry: (failureCount, error) => {
            if (error instanceof ApiError && error.status === 404) {
                return false;
            }

            return failureCount < 2;
        },
    });
}
