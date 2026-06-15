'use client';

import { memberMutationKeys } from './member-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { withdrawMember } from '../api/withdraw-member';

type UseWithdrawMemberMutationProps = {
    workspaceId: string | number;
};

export function useWithdrawMemberMutation({ workspaceId }: UseWithdrawMemberMutationProps) {
    return useMutation({
        mutationKey: memberMutationKeys.withdraw(workspaceId),
        mutationFn: () => withdrawMember(workspaceId),
    });
}
