'use client';

import { MemberActionsMenu } from './member-actions-menu';
import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import { WorkspaceRoleBadge } from '@entities/workspace';

import type { WorkspaceMember } from '@entities/member';
import type { MemberActions } from '../lib/get-member-actions';

type WorkspaceMemberRowProps = {
    member: WorkspaceMember;
    isMe: boolean;
    showActionsColumn: boolean;
    actions: MemberActions;
    onChangeRole: () => void;
    onRemove: () => void;
};

export function WorkspaceMemberRow({
    member,
    isMe,
    showActionsColumn,
    actions,
    onChangeRole,
    onRemove,
}: WorkspaceMemberRowProps) {
    const t = useTranslations('members');
    const hasActions = actions.canChangeRole || actions.canRemove;

    return (
        <tr className="group transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <MemberAvatar name={member.name} profileImageUrl={member.profileImageUrl} />
                    <span className="text-[14px] font-bold text-slate-900">
                        {member.name}
                        {isMe ? (
                            <span className="ml-1.5 rounded border border-blue-100/50 bg-blue-50 px-1.5 py-0.5 text-[12px] font-bold text-blue-600">
                                {t('me')}
                            </span>
                        ) : null}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-[14px] font-medium text-slate-500">{member.email}</td>
            <td className="px-6 py-4">
                <WorkspaceRoleBadge role={member.role} label={t(`roles.${member.role}`)} />
            </td>
            {showActionsColumn ? (
                <td className="px-6 py-4 text-center">
                    {hasActions ? (
                        <div className="flex justify-center">
                            <MemberActionsMenu
                                canChangeRole={actions.canChangeRole}
                                canRemove={actions.canRemove}
                                onChangeRole={onChangeRole}
                                onRemove={onRemove}
                            />
                        </div>
                    ) : null}
                </td>
            ) : null}
        </tr>
    );
}
