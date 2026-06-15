'use client';

import { useState } from 'react';

import { WorkspaceEditModal } from './workspace-edit-modal';
import { useTranslations } from 'next-intl';

import { useMeWorkspacesQuery } from '@entities/user';
import { findWorkspaceById, isWorkspaceManager, useWorkspaceQuery } from '@entities/workspace';

import { Button, Card } from '@shared/ui';

import type { ReactNode } from 'react';

type Props = {
    workspaceId: string;
};

export function WorkspaceSetting({ workspaceId }: Props) {
    const t = useTranslations('settings');

    const { data: workspace } = useWorkspaceQuery({ workspaceId, enabled: !!workspaceId });
    const { data: meWorkspaces } = useMeWorkspacesQuery();
    const myWorkspace = findWorkspaceById(meWorkspaces?.items ?? [], workspaceId);
    const canManageWorkspace = isWorkspaceManager(myWorkspace?.role);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            title={
                <div className="flex items-center justify-between">
                    <span>{t('workspaceInfo')}</span>
                    {canManageWorkspace && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 font-bold text-blue-600"
                            onClick={handleOpen}
                        >
                            {t('workspaceEdit')}
                        </Button>
                    )}
                </div>
            }
        >
            <div className="flex flex-col gap-6">
                <LabeledWorkspaceInfo label={t('workspaceName')} value={workspace?.name} />
                <LabeledWorkspaceInfo label={t('workspaceDescription')} value={workspace?.description ?? '-'} />
            </div>
            {canManageWorkspace && workspace && (
                <WorkspaceEditModal
                    open={open}
                    workspaceId={workspaceId}
                    initialName={workspace.name}
                    initialDescription={workspace.description ?? ''}
                    onClose={handleClose}
                />
            )}
        </Card>
    );
}

function LabeledWorkspaceInfo({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="min-w-0 font-bold wrap-break-word whitespace-pre-wrap text-slate-900">{value}</div>{' '}
        </div>
    );
}
