import type { Workspace } from '@entities/workspace';

export type MeUserResponse = {
    id: number; // 사용자 식별자
    email: string;
    nickname: string;
    status: string;
    profileImageFileId: number | null;
    profileImageUrl: string | null;
    workspaces: Workspace[];
    extensions: Record<string, unknown>;
};
