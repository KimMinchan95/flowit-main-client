'use client';

import { useState } from 'react';

import { MemberRemoveModal } from './member-remove-modal';
import { MemberRoleChangeModal } from './member-role-change-modal';
import { WorkspaceMemberRow } from './workspace-member-row';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { isGetWorkspaceMembersErrorCode, useWorkspaceMembersQuery } from '@entities/member';
import { useMeUserQuery, useMeWorkspacesQuery } from '@entities/user';
import { findWorkspaceById, isWorkspaceManager } from '@entities/workspace';

import { getMappedApiErrorMessage } from '@shared/api';

import { getMemberActions } from '../lib/get-member-actions';

import type { WorkspaceMember } from '@entities/member';

type MemberActionState = {
    member: WorkspaceMember;
    type: 'role' | 'remove';
};

type Props = {
    workspaceId: string;
};

export function WorkspaceMembersTable({ workspaceId }: Props) {
    const t = useTranslations('members');
    const tErrors = useTranslations('members.loadErrors');
    const { data: meUser } = useMeUserQuery();
    const { data: meWorkspaces } = useMeWorkspacesQuery();
    const { data, isPending, isError, error } = useWorkspaceMembersQuery({ workspaceId, enabled: !!workspaceId });

    const [activeAction, setActiveAction] = useState<MemberActionState | null>(null);

    const myWorkspace = findWorkspaceById(meWorkspaces?.items ?? [], workspaceId);
    const canManageMembers = isWorkspaceManager(myWorkspace?.role);
    const isMe = meUser?.email === activeAction?.member.email;

    if (isPending) {
        return (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white py-16 shadow-sm">
                <Loader2 className="size-6 animate-spin text-slate-400" />
            </div>
        );
    }

    if (isError || !data) {
        const errorMessage = isError
            ? getMappedApiErrorMessage({
                  error,
                  fallback: t('loadFailed'),
                  unknownError: t('loadUnknownError'),
                  isKnownErrorCode: isGetWorkspaceMembersErrorCode,
                  getKnownErrorMessage: errorCode => tErrors(errorCode),
              })
            : t('loadFailed');

        return (
            <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-8 text-center text-sm font-medium text-rose-500 shadow-sm">
                {errorMessage}
            </div>
        );
    }

    const activeMemberActions = activeAction
        ? getMemberActions(myWorkspace?.role, activeAction.member, isMe, data.members)
        : null;

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-200/80 bg-slate-50/50 text-[13px] font-bold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">{t('name')}</th>
                            <th className="px-6 py-4">{t('email')}</th>
                            <th className="px-6 py-4">{t('role')}</th>
                            {canManageMembers ? <th className="px-6 py-4 text-center">{t('action')}</th> : null}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.members.map(member => {
                            const isMe = meUser?.email === member.email;
                            const actions = getMemberActions(myWorkspace?.role, member, isMe, data.members);

                            return (
                                <WorkspaceMemberRow
                                    key={member.memberId}
                                    member={member}
                                    isMe={isMe}
                                    showActionsColumn={canManageMembers}
                                    actions={actions}
                                    onChangeRole={() => setActiveAction({ member, type: 'role' })}
                                    onRemove={() => setActiveAction({ member, type: 'remove' })}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {activeAction?.type === 'role' && activeMemberActions ? (
                <MemberRoleChangeModal
                    key={activeAction.member.memberId}
                    open
                    workspaceId={workspaceId}
                    member={activeAction.member}
                    allowedRoles={activeMemberActions.allowedRoles}
                    onClose={() => setActiveAction(null)}
                />
            ) : null}
            {activeAction?.type === 'remove' ? (
                <MemberRemoveModal
                    open
                    workspaceId={workspaceId}
                    member={activeAction.member}
                    onClose={() => setActiveAction(null)}
                />
            ) : null}
        </>
    );
}
