'use client';

import { meWorkspacesQueryKeys } from './me-workspaces-query-keys';
import { useQuery } from '@tanstack/react-query';

import { meWorkspaces } from '../api';

type UseMeWorkspacesQueryProps = {
    enabled?: boolean;
};

export function useMeWorkspacesQuery({ enabled = true }: UseMeWorkspacesQueryProps = {}) {
    return useQuery({
        queryKey: meWorkspacesQueryKeys.lists(),
        queryFn: meWorkspaces,
        staleTime: 0,
        refetchOnMount: 'always',
        enabled,
    });
}
