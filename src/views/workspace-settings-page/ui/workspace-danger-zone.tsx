'use client';

import { WorkspaceDeleteModal } from './workspace-delete-modal';
import { WorkspaceWithdrawModal } from './workspace-withdraw-modal';
import { LogOut, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWithdrawMemberMutation } from '@entities/member';
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
import { useModal } from '@shared/lib/hooks';

type Props = {
    workspaceId: string;
};

export function WorkspaceDangerZone({ workspaceId }: Props) {
    const t = useTranslations('settings');
    const router = useRouter();

    const { data: workspace } = useWorkspaceQuery({ workspaceId, enabled: !!workspaceId });
    const { data: meWorkspaces } = useMeWorkspacesQuery();
    const myWorkspace = findWorkspaceById(meWorkspaces?.items ?? [], workspaceId);
    const canWithdrawWorkspace = myWorkspace !== undefined;
    const canDeleteWorkspace = isWorkspaceOwner(myWorkspace?.role);

    const { open: withdrawModalOpen, onOpen: openWithdrawModal, onClose: closeWithdrawModal } = useModal();
    const { open: deleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useModal();

    const {
        mutate: withdrawMemberMutate,
        isPending: isWithdrawing,
        error: withdrawError,
    } = useWithdrawMemberMutation({
        workspaceId,
    });

    const {
        mutate: deleteWorkspaceMutate,
        isPending: isDeletingWorkspace,
        error: deleteError,
    } = useDeleteWorkspaceMutation({
        workspaceId,
    });

    const navigateToWorkspaceList = async () => {
        router.replace(WORKSPACE_ROUTES.list);
    };

    const handleConfirmWithdraw = () => {
        withdrawMemberMutate(undefined, {
            onSuccess: async () => {
                closeWithdrawModal();
                await navigateToWorkspaceList();
            },
        });
    };

    const handleConfirmDelete = () => {
        deleteWorkspaceMutate(undefined, {
            onSuccess: async () => {
                closeDeleteModal();
                await navigateToWorkspaceList();
            },
        });
    };

    if (!workspace || (!canWithdrawWorkspace && !canDeleteWorkspace)) {
        return null;
    }

    return (
        <Card className="border-rose-200/60 bg-rose-50/20">
            {canWithdrawWorkspace ? (
                <div>
                    <label className="mb-2 block text-sm font-bold text-rose-500">{t('workspaceWithdraw')}</label>
                    <p className="mb-5 text-sm font-medium text-slate-500">{t('workspaceWithdrawDescription')}</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="border border-rose-200/80 bg-rose-50 text-rose-600 shadow-sm hover:bg-rose-600 hover:text-white"
                        icon={<LogOut size={14} />}
                        onClick={openWithdrawModal}
                    >
                        {t('workspaceWithdrawButton')}
                    </Button>
                    <WorkspaceWithdrawModal
                        open={withdrawModalOpen}
                        workspaceName={workspace.name}
                        isWithdrawing={isWithdrawing}
                        error={withdrawError}
                        onClose={closeWithdrawModal}
                        onConfirm={handleConfirmWithdraw}
                    />
                </div>
            ) : null}
            {canWithdrawWorkspace && canDeleteWorkspace ? (
                <div className="mt-6 border-t border-slate-100 pt-6" />
            ) : null}
            {canDeleteWorkspace ? (
                <div>
                    <label className="mb-2 block text-sm font-bold text-rose-500">{t('workspaceDelete')}</label>
                    <p className="mb-5 text-sm font-medium text-slate-500">{t('workspaceDeleteDescription')}</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="border border-rose-200/80 bg-rose-50 text-rose-600 shadow-sm hover:bg-rose-600 hover:text-white"
                        icon={<Trash2 size={14} />}
                        onClick={openDeleteModal}
                    >
                        {t('workspaceDeleteButton')}
                    </Button>
                    <WorkspaceDeleteModal
                        open={deleteModalOpen}
                        workspaceName={workspace.name}
                        isDeleting={isDeletingWorkspace}
                        error={deleteError}
                        onClose={closeDeleteModal}
                        onConfirm={handleConfirmDelete}
                    />
                </div>
            ) : null}
        </Card>
    );
}
