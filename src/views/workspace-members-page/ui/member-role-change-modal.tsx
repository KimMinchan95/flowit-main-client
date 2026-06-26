'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useUpdateWorkspaceMemberRoleMutation } from '@entities/member';

import { Button, Modal } from '@shared/ui';
import { getMappedApiErrorMessage } from '@shared/api';
import { cn } from '@shared/lib';

import { isMemberRoleChangeErrorCode } from '../model';

import type { WorkspaceMember } from '@entities/member';
import type { WorkspaceMemberRole } from '@entities/workspace';

const ROLE_OPTION_CLASSNAME: Record<WorkspaceMemberRole, string> = {
    OWNER: 'border-purple-100/50 has-[:checked]:bg-purple-50 has-[:checked]:text-purple-700',
    ADMIN: 'border-orange-100/50 has-[:checked]:bg-orange-50 has-[:checked]:text-orange-700',
    MEMBER: 'border-slate-200 has-[:checked]:bg-slate-100 has-[:checked]:text-slate-600',
};

type MemberRoleChangeModalProps = {
    open: boolean;
    workspaceId: string;
    member: WorkspaceMember;
    allowedRoles: WorkspaceMemberRole[];
    onClose: () => void;
};

export function MemberRoleChangeModal({
    open,
    workspaceId,
    member,
    allowedRoles,
    onClose,
}: MemberRoleChangeModalProps) {
    const t = useTranslations('members');
    const tCommon = useTranslations('common');

    const [selectedRole, setSelectedRole] = useState<WorkspaceMemberRole | null>(() => allowedRoles[0] ?? null);

    const {
        mutate: updateRoleMutate,
        isPending,
        error,
        reset,
    } = useUpdateWorkspaceMemberRoleMutation({
        workspaceId,
        memberId: member.memberId,
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleConfirm = () => {
        if (!selectedRole) {
            return;
        }

        updateRoleMutate(
            { role: selectedRole },
            {
                onSuccess: () => {
                    handleClose();
                },
            },
        );
    };

    const submitErrorMessage = error
        ? getMappedApiErrorMessage({
              error,
              fallback: t('changeRoleFailed'),
              unknownError: t('changeRoleUnknownError'),
              isKnownErrorCode: isMemberRoleChangeErrorCode,
              getKnownErrorMessage: errorCode => t(`changeRoleErrors.${errorCode}`),
          })
        : null;

    return (
        <Modal
            open={open}
            title={t('changeRoleTitle')}
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
                        disabled={isPending || !selectedRole}
                        onClick={handleConfirm}
                    >
                        {isPending ? t('changingRole') : tCommon('save')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                <p className="text-sm font-medium text-slate-600">
                    {t('changeRoleDescription', { name: member.name })}
                </p>
                <div className="flex flex-col gap-2">
                    {allowedRoles.map(role => (
                        <label
                            key={role}
                            className={cn(
                                'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-bold text-slate-600 transition-colors',
                                ROLE_OPTION_CLASSNAME[role],
                            )}
                        >
                            <input
                                type="radio"
                                name="member-role"
                                value={role}
                                checked={selectedRole === role}
                                className="size-4 accent-blue-600"
                                onChange={() => setSelectedRole(role)}
                            />
                            {t(`roles.${role}`)}
                        </label>
                    ))}
                </div>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
