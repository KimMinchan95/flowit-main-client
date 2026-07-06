export function isTaskCommentOwnedByMember(commentAuthorMemberId: number, myMemberId?: number): boolean {
    return myMemberId !== null && myMemberId !== undefined && commentAuthorMemberId === myMemberId;
}
