'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MemberAvatar, useWorkspaceMembersQuery } from '@entities/member';

import { Button } from '@shared/ui';

const MAX_VISIBLE_MEMBERS = 5;

type BoardHeaderProps = {
    workspaceId: string;
    workspaceName?: string;
    onCreateTask?: () => void;
    onInviteMembers?: () => void;
};

export function BoardHeader({ workspaceId, workspaceName, onCreateTask, onInviteMembers }: BoardHeaderProps) {
    const t = useTranslations('board');
    const { data } = useWorkspaceMembersQuery({ workspaceId, enabled: !!workspaceId });

    const members = data?.members.filter(member => member.status === 'ACTIVE').slice(0, MAX_VISIBLE_MEMBERS) ?? [];

    return (
        <div className="mb-8 flex shrink-0 items-center justify-between gap-4 overflow-x-auto pb-2">
            <div className="flex shrink-0 items-center gap-4">
                <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight whitespace-nowrap text-slate-900">
                    {workspaceName ?? '…'}
                    <span className="mx-2 font-light text-slate-300">|</span>
                    <span className="ml-1 text-lg font-bold text-slate-600">{t('projectSubtitle')}</span>
                </h1>
                <div className="flex shrink-0 items-center">
                    <div className="ml-4 flex -space-x-2">
                        {members.map(member => (
                            <MemberAvatar
                                key={member.memberId}
                                name={member.name}
                                profileImageUrl={member.profileImageUrl}
                                size="sm"
                            />
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<Plus size={14} />}
                            onClick={onInviteMembers}
                            rounded="full"
                            className="ml-1 size-7 border border-dashed border-slate-400 bg-white p-0 text-slate-500 shadow-sm transition-colors hover:border-blue-400 hover:bg-slate-50 hover:text-blue-600"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onInviteMembers}
                        className="ml-3 whitespace-nowrap text-blue-600 hover:underline"
                    >
                        {t('inviteMembers')}
                    </Button>
                </div>
            </div>

            <div className="ml-auto flex shrink-0 items-center">
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={onCreateTask}>
                    {t('createTask')}
                </Button>
            </div>
        </div>
    );
}
