'use client';

import { useState } from 'react';

import { WorkspaceDeleteModal } from './workspace-delete-modal';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMeWorkspacesQuery } from '@entities/user';
import {
    findWorkspaceById,
    isWorkspaceOwner,
    useDeleteWorkspaceMutation,
    useWorkspaceQuery,
} from '@entities/workspace';

import { useRouter } from '@shared/i18n';
import { Button, Card } from '@shared/ui';
import { WORKSPACE_ROUTES } from '@shared/lib';

type Props = {
    workspaceId: string;
};

export function WorkspaceDangerZone({ workspaceId }: Props) {
    const t = useTranslations('settings');
    const router = useRouter();

    const { data: workspace } = useWorkspaceQuery({ workspaceId, enabled: !!workspaceId });
    const { data: meWorkspaces } = useMeWorkspacesQuery();
    const myWorkspace = findWorkspaceById(meWorkspaces?.items ?? [], workspaceId);
    const canDeleteWorkspace = isWorkspaceOwner(myWorkspace?.role);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const {
        mutate: deleteWorkspaceMutate,
        isPending: isDeletingWorkspace,
        error: deleteError,
    } = useDeleteWorkspaceMutation({
        workspaceId,
    });

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        deleteWorkspaceMutate(undefined, {
            onSuccess: async () => {
                handleCloseDeleteModal();
                router.replace(WORKSPACE_ROUTES.list);
            },
        });
    };

    if (!workspace || !canDeleteWorkspace) {
        return null;
    }

    return (
        <Card className="border-rose-200/60 bg-rose-50/20">
            <div>
                <label className="mb-2 block text-sm font-bold text-rose-500">{t('workspaceDelete')}</label>
                <p className="mb-5 text-sm font-medium text-slate-500">{t('workspaceDeleteDescription')}</p>
                <Button
                    variant="ghost"
                    size="sm"
                    className="border border-rose-200/80 bg-rose-50 text-rose-600 shadow-sm hover:bg-rose-600 hover:text-white"
                    icon={<Trash2 size={14} />}
                    onClick={handleOpenDeleteModal}
                >
                    {t('workspaceDeleteButton')}
                </Button>
                <WorkspaceDeleteModal
                    open={deleteModalOpen}
                    workspaceName={workspace.name}
                    isDeleting={isDeletingWorkspace}
                    error={deleteError}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleConfirmDelete}
                />
            </div>
        </Card>
    );
}
