'use client';

import { useState } from 'react';

import { CheckCircle, Copy, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkspaceQuery } from '@entities/workspace';

import { Button, Card } from '@shared/ui';

const LOADING_INVITATION_CODE = '...';

type Props = {
    workspaceId: string;
};

export function InvitationCodeShare({ workspaceId }: Props) {
    const t = useTranslations('workspaces');
    const tCommon = useTranslations('common');

    const { data: workspace, isPending } = useWorkspaceQuery({ workspaceId, enabled: !!workspaceId });
    const invitationCode = workspace?.inviteCode ?? LOADING_INVITATION_CODE;

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(invitationCode);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            alert(t('copyFailed'));
        }
    };

    return (
        <Card>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <h3 className="text-md mb-1 font-bold text-slate-900">{t('invitationCodeShare')}</h3>
                    <p className="text-sm text-slate-500">{t('invitationCodeShareDescription')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-slate-800` w-48 rounded-lg border border-slate-200/80 bg-slate-50 px-4 py-2 text-center font-mono text-[14px] font-bold tracking-widest">
                        {invitationCode}
                    </div>
                    <Button
                        variant="neutral"
                        size="sm"
                        className="font-bold"
                        disabled={isPending || isCopied}
                        onClick={handleCopy}
                    >
                        <CopiedButtonIcon isPending={isPending} isCopied={isCopied} />
                        {isCopied ? tCommon('copied') : tCommon('copy')}
                    </Button>
                </div>
            </div>
        </Card>
    );
}

type CopiedButtonStatusProps = {
    isPending: boolean;
    isCopied: boolean;
};

function CopiedButtonIcon({ isPending, isCopied }: CopiedButtonStatusProps) {
    if (isPending) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    if (isCopied) {
        return <CheckCircle className="h-4 w-4" />;
    }
    return <Copy className="h-4 w-4" />;
}
