export type JoinWorkspaceByInviteCodeRequest = {
    inviteCode: string;
};

export type JoinWorkspaceByInviteCodeResponse = {
    joinRequestId: number;
    workspaceId: number;
    workspaceName: string;
    userId: number;
    userName: string;
    userEmail: string;
    memberId: number;
    method: 'INVITE_CODE';
    inviteCode: string;
    status: string;
    joinedAt: number;
};
