'use client';

import { useWorkspaceMembersQuery } from './use-workspace-members-query';

type UseWorkspaceMemberNameMapProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceMemberNameMap({ workspaceId, enabled = true }: UseWorkspaceMemberNameMapProps) {
    const { data } = useWorkspaceMembersQuery({ workspaceId, enabled: enabled && Boolean(workspaceId) });

    const memberNameByMemberId = new Map<number, string>();

    for (const member of data?.members ?? []) {
        memberNameByMemberId.set(member.memberId, member.name);
    }

    return memberNameByMemberId;
}
