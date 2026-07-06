import type { WorkspaceMember } from '../model/workspace-members.types';

type FindMemberProfileImageUrlParams = {
    members?: WorkspaceMember[];
    memberId?: number | null;
};

export function findMemberProfileImageUrl({ members, memberId }: FindMemberProfileImageUrlParams): string | null {
    if (!members?.length || memberId === null || memberId === undefined) {
        return null;
    }

    const member = members.find(currentMember => currentMember.memberId === Number(memberId));

    return member?.profileImageUrl ?? null;
}
