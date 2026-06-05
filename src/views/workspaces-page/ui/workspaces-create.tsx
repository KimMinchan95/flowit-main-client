'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { createWorkspace, meWorkspacesQueryKeys } from '@entities/workspace';

import { Button, LabeledInput, LabeledTextarea, Modal } from '@shared/ui';
import { isValidWorkspaceName, MAX_DEFAULT_LENGTH, MAX_TEXT_AREA_LENGTH } from '@shared/lib';

import {
    CREATE_WORKSPACE_FORM_FIELDS,
    CREATE_WORKSPACE_FORM_ID,
    INITIAL_CREATE_WORKSPACE_FORM_VALUES,
    isCreateWorkspaceFormField,
} from '../model/constants';

import type { ChangeEvent, FormEvent } from 'react';

export function WorkspaceCreate() {
    const t = useTranslations('workspaces');
    const commonT = useTranslations('common');
    const queryClient = useQueryClient();

    const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] = useState(false);
    const [formValues, setFormValues] = useState(INITIAL_CREATE_WORKSPACE_FORM_VALUES);

    const workspaceName = formValues[CREATE_WORKSPACE_FORM_FIELDS.NAME];
    const workspaceDescription = formValues[CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION];

    const { mutate: createWorkspaceMutate, isPending: isCreatingWorkspace } = useMutation({
        mutationKey: ['workspace', 'create'],
        mutationFn: createWorkspace,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: meWorkspacesQueryKeys.all });
            handleCloseCreateWorkspaceModal();
        },
    });

    const handleOpenCreateWorkspaceModal = () => {
        setCreateWorkspaceModalOpen(true);
    };

    const handleCloseCreateWorkspaceModal = () => {
        setCreateWorkspaceModalOpen(false);
        setFormValues(INITIAL_CREATE_WORKSPACE_FORM_VALUES);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (!isCreateWorkspaceFormField(name)) {
            return;
        }

        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidWorkspaceName(workspaceName)) {
            return;
        }

        createWorkspaceMutate({
            name: workspaceName.trim(),
            description: workspaceDescription.trim() || undefined,
        });
    };

    const isNameError = workspaceName.length > 0 && !isValidWorkspaceName(workspaceName);
    const isSubmitDisabled = isCreatingWorkspace || !isValidWorkspaceName(workspaceName);

    return (
        <>
            <div
                onClick={handleOpenCreateWorkspaceModal}
                className="group flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-7 text-slate-500 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600"
            >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-transform group-hover:scale-110">
                    <Plus className="text-slate-400 group-hover:text-blue-600" width={20} height={20} />
                </div>
                <p>{t('createWorkspace')}</p>
            </div>
            <Modal
                open={createWorkspaceModalOpen}
                title={t('createWorkspace')}
                onClose={handleCloseCreateWorkspaceModal}
                footer={
                    <div className="flex w-full gap-3">
                        <Button
                            type="button"
                            variant="neutral"
                            size="md"
                            onClick={handleCloseCreateWorkspaceModal}
                            fullWidth
                        >
                            {commonT('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            size="md"
                            fullWidth
                            form={CREATE_WORKSPACE_FORM_ID}
                            disabled={isSubmitDisabled}
                        >
                            {isCreatingWorkspace ? t('creatingWorkspace') : t('createWorkspaceButton')}
                        </Button>
                    </div>
                }
            >
                <form id={CREATE_WORKSPACE_FORM_ID} onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <LabeledInput
                            label={t('workspaceName')}
                            name={CREATE_WORKSPACE_FORM_FIELDS.NAME}
                            placeholder={t('workspaceNamePlaceholder')}
                            value={workspaceName}
                            onChange={handleChange}
                            maxLength={MAX_DEFAULT_LENGTH}
                            errorMessage={t('workspaceNameRequired')}
                            isError={isNameError}
                        />
                        <LabeledTextarea
                            label={t('descriptionOptional')}
                            name={CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION}
                            placeholder={t('descriptionPlaceholder')}
                            value={workspaceDescription}
                            onChange={handleChange}
                            maxLength={MAX_TEXT_AREA_LENGTH}
                            rows={3}
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
}
