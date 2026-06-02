/** @see WorkspaceMemberRole (API enum)
 * - OWNER: 워크스페이스 소유자 권한입니다.
 * - ADMIN: 워크스페이스를 관리할 수 있는 관리자 권한입니다.
 * - MEMBER: 워크스페이스에 참여한 일반 멤버 권한입니다.
 */
export type WorkspaceMemberRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export type Workspace = {
    id: number;
    name: string;
    description: string | null;
    memberCount: number;
    role: string;
    joinedAt: number;
};
