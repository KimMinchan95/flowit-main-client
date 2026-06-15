'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { buildUpdateWorkspaceRequest, useUpdateWorkspaceMutation } from '@entities/workspace';

import { Button, LabeledInput, LabeledTextarea, Modal } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import { isValidWorkspaceName, MAX_DEFAULT_LENGTH, MAX_TEXT_AREA_LENGTH } from '@shared/lib';

import type { FormEvent } from 'react';

const WORKSPACE_EDIT_FORM_ID = 'workspace-edit-form';

type WorkspaceEditModalProps = {
    open: boolean;
    workspaceId: string;
    initialName: string;
    initialDescription: string;
    onClose: () => void;
};

export function WorkspaceEditModal({
    open,
    workspaceId,
    initialName,
    initialDescription,
    onClose,
}: WorkspaceEditModalProps) {
    const t = useTranslations('settings');
    const tWorkspaces = useTranslations('workspaces');
    const tCommon = useTranslations('common');

    const {
        mutate: updateWorkspaceMutate,
        isPending: isUpdatingWorkspace,
        error,
    } = useUpdateWorkspaceMutation({
        workspaceId,
    });

    const [draftName, setDraftName] = useState<string | null>(null);
    const [draftDescription, setDraftDescription] = useState<string | null>(null);

    const nameInputValue = draftName ?? initialName;
    const descriptionInputValue = draftDescription ?? initialDescription;

    const updateBody = buildUpdateWorkspaceRequest({
        name: nameInputValue,
        description: descriptionInputValue,
        initialName,
        initialDescription,
    });
    const hasChanges = updateBody.name !== undefined || updateBody.description !== undefined;

    const handleClose = () => {
        setDraftName(null);
        setDraftDescription(null);
        onClose();
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidWorkspaceName(nameInputValue)) {
            return;
        }

        if (!hasChanges) {
            handleClose();
            return;
        }

        updateWorkspaceMutate(updateBody, {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const isNameError = nameInputValue.length > 0 && !isValidWorkspaceName(nameInputValue);
    const isSaveDisabled = isUpdatingWorkspace || !isValidWorkspaceName(nameInputValue) || !hasChanges;
    const submitErrorMessage = error ? getApiErrorMessage(error, t('workspaceUpdateFailed')) : null;

    return (
        <Modal
            open={open}
            title={t('workspaceEdit')}
            onClose={handleClose}
            footer={
                <div className="flex w-full gap-3">
                    <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={handleClose}>
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        className="font-bold"
                        disabled={isSaveDisabled}
                        type="submit"
                        form={WORKSPACE_EDIT_FORM_ID}
                    >
                        {isUpdatingWorkspace ? t('workspaceUpdating') : tCommon('save')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <form id={WORKSPACE_EDIT_FORM_ID} onSubmit={handleSave}>
                    <div className="flex flex-col gap-4">
                        <LabeledInput
                            name="name"
                            label={t('workspaceName')}
                            placeholder={tWorkspaces('workspaceNamePlaceholder')}
                            errorMessage={tWorkspaces('workspaceNameRequired')}
                            isError={isNameError}
                            value={nameInputValue}
                            maxLength={MAX_DEFAULT_LENGTH}
                            aria-invalid={isNameError}
                            onChange={e => setDraftName(e.target.value)}
                        />
                        <LabeledTextarea
                            name="description"
                            label={tWorkspaces('descriptionOptional')}
                            placeholder={tWorkspaces('descriptionPlaceholder')}
                            value={descriptionInputValue}
                            maxLength={MAX_TEXT_AREA_LENGTH}
                            rows={3}
                            onChange={e => setDraftDescription(e.target.value)}
                        />
                    </div>
                </form>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
