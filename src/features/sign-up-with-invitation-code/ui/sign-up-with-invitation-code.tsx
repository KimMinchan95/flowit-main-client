'use client';

import { useState } from 'react';

import { Key } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, LabeledInput, Modal } from '@shared/ui';
import { useModal } from '@shared/lib/hooks';

import { getJoinInviteCodeErrorMessage } from '../lib';
import { useJoinWorkspaceByInviteCodeMutation } from '../model';

import type { ChangeEvent, FormEvent } from 'react';

const INVITATION_CODE_FORM_ID = 'invitation-code-form';
const INITIAL_INVITATION_CODE = '';
const EXAMPLE_INVITATION_CODE = 'A1B2-C3D4-E5F6';

export function SignUpWithInvitationCode() {
    const t = useTranslations('workspaces');
    const tCommon = useTranslations('common');

    const { open, onOpen, onClose } = useModal();
    const [invitationCode, setInvitationCode] = useState(INITIAL_INVITATION_CODE);
    const {
        mutate: joinWorkspaceByInviteCode,
        isPending: isJoiningWorkspace,
        error,
        reset,
    } = useJoinWorkspaceByInviteCodeMutation();

    const submitErrorMessage = error
        ? getJoinInviteCodeErrorMessage({
              error,
              fallback: t('joinWithInvitationCodeFailed'),
              unknownError: t('joinInviteCodeUnknownError'),
              getKnownErrorMessage: errorCode => t(`joinInviteCodeErrors.${errorCode}`),
          })
        : null;

    const handleClose = () => {
        onClose();
        setInvitationCode(INITIAL_INVITATION_CODE);
        reset();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInvitationCode(e.target.value);
        if (error) {
            reset();
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedInviteCode = invitationCode.trim();
        if (!trimmedInviteCode) {
            return;
        }

        joinWorkspaceByInviteCode(
            { inviteCode: trimmedInviteCode },
            {
                onSuccess: () => {
                    handleClose();
                },
            },
        );
    };

    return (
        <>
            <div
                onClick={onOpen}
                className="group flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-7 text-slate-500 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/30 hover:text-emerald-600"
            >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-transform group-hover:scale-110">
                    <Key className="text-slate-400 group-hover:text-emerald-600" width={20} height={20} />
                </div>
                <p>{t('joinWithInvitationCode')}</p>
            </div>
            <Modal
                open={open}
                title={t('joinWithInvitationCode')}
                onClose={handleClose}
                footer={
                    <div className="flex w-full gap-3">
                        <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={handleClose}>
                            {tCommon('cancel')}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            fullWidth
                            className="font-bold"
                            type="submit"
                            form={INVITATION_CODE_FORM_ID}
                            disabled={isJoiningWorkspace}
                        >
                            {isJoiningWorkspace ? tCommon('joining') : tCommon('join')}
                        </Button>
                    </div>
                }
            >
                <form id={INVITATION_CODE_FORM_ID} onSubmit={handleSubmit} className="py-3">
                    <LabeledInput
                        label={t('invitationCode')}
                        name="invitationCode"
                        value={invitationCode}
                        onChange={handleChange}
                        placeholder={EXAMPLE_INVITATION_CODE}
                        isError={Boolean(submitErrorMessage)}
                    />
                    {submitErrorMessage ? <p className="text-sm text-red-600">{submitErrorMessage}</p> : null}
                </form>
                <p className="mt-2 text-xs font-medium text-slate-500">{t('invitationCodeDescription')}</p>
            </Modal>
        </>
    );
}
