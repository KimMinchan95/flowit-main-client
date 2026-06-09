'use client';

import { notFound } from 'next/navigation';

import { useWorkspaceRouteAccess } from '../model';

type WorkspaceRouteGuardProps = {
    workspaceId: string;
    children: React.ReactNode;
};

export function WorkspaceRouteGuard({ workspaceId, children }: WorkspaceRouteGuardProps) {
    const { isChecking, isAllowed, isError } = useWorkspaceRouteAccess(workspaceId);

    if (isChecking) {
        return null;
    }

    if (isError || !isAllowed) {
        notFound();
    }

    return children;
}
