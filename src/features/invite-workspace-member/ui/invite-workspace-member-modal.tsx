'use client';

import { useState } from 'react';

import { CheckCircle, Copy, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { useWorkspaceQuery } from '@entities/workspace';

import { Button, Input, Modal } from '@shared/ui';
import { isValidEmail } from '@shared/lib';

import { getInviteEmailErrorMessage } from '../lib';
import { useInviteWorkspaceMemberMutation } from '../model';

const LOADING_INVITATION_CODE = '...';

type InviteWorkspaceMemberModalProps = {
    workspaceId: string;
    open: boolean;
    onClose: () => void;
};

function SendInviteButtonContent({
    isSending,
    isSuccess,
    sendLabel,
    sentLabel,
}: {
    isSending: boolean;
    isSuccess: boolean;
    sendLabel: string;
    sentLabel: string;
}) {
    if (isSending) {
        return <Loader2 className="size-4 animate-spin" />;
    }

    if (isSuccess) {
        return sentLabel;
    }

    return sendLabel;
}

function CopyButtonIcon({ isPending, isCopied }: { isPending: boolean; isCopied: boolean }) {
    if (isPending) {
        return <Loader2 className="size-4 animate-spin" />;
    }

    if (isCopied) {
        return <CheckCircle className="size-4" />;
    }

    return <Copy className="size-4" />;
}

export function InviteWorkspaceMemberModal({ workspaceId, open, onClose }: InviteWorkspaceMemberModalProps) {
    const t = useTranslations('inviteMember');
    const tWorkspaces = useTranslations('workspaces');
    const tCommon = useTranslations('common');
    const locale = useLocale();

    const { data: workspace, isPending: isWorkspacePending } = useWorkspaceQuery({
        workspaceId,
        enabled: open && !!workspaceId,
    });
    const {
        mutate: sendInviteEmail,
        isPending: isSending,
        isSuccess,
        error,
        reset,
    } = useInviteWorkspaceMemberMutation();

    const [inviteEmail, setInviteEmail] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const invitationCode = workspace?.inviteCode ?? LOADING_INVITATION_CODE;
    const trimmedEmail = inviteEmail.trim();
    const isEmailValid = isValidEmail(trimmedEmail);

    const handleClose = () => {
        setInviteEmail('');
        setIsCopied(false);
        reset();
        onClose();
    };

    const handleSendInvite = () => {
        if (!isEmailValid || isSending) {
            return;
        }

        sendInviteEmail(
            { workspaceId, email: trimmedEmail, locale },
            {
                onSuccess: () => {
                    setInviteEmail('');
                },
            },
        );
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(invitationCode);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (copyError) {
            console.error(copyError);
            alert(tWorkspaces('copyFailed'));
        }
    };

    const copyButtonLabel = isCopied ? tCommon('copied') : tCommon('copy');
    const sendErrorMessage = error
        ? getInviteEmailErrorMessage({
              error,
              fallback: t('sendFailed'),
              sandboxHint: t('sendFailedSandbox'),
          })
        : null;

    return (
        <Modal open={open} title={t('title')} onClose={handleClose} className="max-w-md">
            <div className="space-y-6">
                <div>
                    <label htmlFor="invite-email" className="mb-2 block text-sm font-bold text-slate-800">
                        {t('emailLabel')}
                    </label>
                    <div className="flex gap-2">
                        <Input
                            id="invite-email"
                            type="email"
                            value={inviteEmail}
                            onChange={event => {
                                setInviteEmail(event.target.value);
                                if (isSuccess || error) {
                                    reset();
                                }
                            }}
                            placeholder={t('emailPlaceholder')}
                            className="flex-1 rounded-lg px-3.5 py-2.5 text-sm"
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            disabled={!isEmailValid || isSending || isSuccess}
                            onClick={handleSendInvite}
                            className="min-w-[70px] shrink-0"
                        >
                            <SendInviteButtonContent
                                isSending={isSending}
                                isSuccess={isSuccess}
                                sendLabel={t('send')}
                                sentLabel={t('sent')}
                            />
                        </Button>
                    </div>
                    {isSuccess && <p className="mt-2 text-xs font-bold text-emerald-600">{t('sendSuccess')}</p>}
                    {sendErrorMessage ? (
                        <p className="mt-2 text-xs font-bold text-rose-500">{sendErrorMessage}</p>
                    ) : null}
                </div>

                <div className="relative flex items-center py-2">
                    <div className="grow border-t border-slate-100" />
                    <span className="mx-4 shrink-0 text-xs font-bold text-slate-400">{t('or')}</span>
                    <div className="grow border-t border-slate-100" />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-bold text-slate-800">
                        {tWorkspaces('invitationCodeShare')}
                    </label>
                    <div className="flex items-center gap-2.5">
                        <div className="flex-1 rounded-lg border border-slate-200/80 bg-slate-50 px-4 py-2.5 text-center font-mono text-sm font-bold tracking-widest text-slate-800">
                            {invitationCode}
                        </div>
                        <Button
                            variant="neutral"
                            size="sm"
                            disabled={isWorkspacePending || isCopied}
                            onClick={handleCopy}
                            className="shrink-0 font-bold"
                        >
                            <CopyButtonIcon isPending={isWorkspacePending} isCopied={isCopied} />
                            {copyButtonLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
