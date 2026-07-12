'use client';

import { WorkspacesCard } from './workspaces-card';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CreateWorkspace } from '@features/create-workspace';
import { SignUpWithInvitationCode } from '@features/sign-up-with-invitation-code';
import { isMeWorkspacesErrorCode, useMeWorkspacesQuery } from '@entities/user';

import { getMappedApiErrorMessage } from '@shared/api';

export function WorkspacesList() {
    const t = useTranslations('workspaces');
    const tErrors = useTranslations('workspaces.loadErrors');
    const { data: meWorkspaces, isPending, isError, error } = useMeWorkspacesQuery();

    if (isPending) {
        return (
            <div className="flex min-h-0 flex-1 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-slate-400" />
            </div>
        );
    }

    if (isError) {
        const errorMessage = getMappedApiErrorMessage({
            error,
            fallback: t('loadFailed'),
            unknownError: t('loadUnknownError'),
            isKnownErrorCode: isMeWorkspacesErrorCode,
            getKnownErrorMessage: errorCode => tErrors(errorCode),
        });

        return (
            <div className="flex min-h-0 flex-1 items-center justify-center px-1 py-2">
                <p className="text-sm font-medium text-rose-500">{errorMessage}</p>
            </div>
        );
    }

    return (
        <div className="min-h-0 flex-1 overflow-y-auto px-1 py-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {meWorkspaces?.items.map(workspace => (
                    <WorkspacesCard key={workspace.id} workspace={workspace} />
                ))}
                <SignUpWithInvitationCode />
                <CreateWorkspace />
            </div>
        </div>
    );
}
