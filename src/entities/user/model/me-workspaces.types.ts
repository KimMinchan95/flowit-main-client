export type MeWorkspaceItem = {
    id: number;
    name: string;
    description: string | null;
    memberCount: number;
    role: string;
    joinedAt: number;
};

export type MeWorkspacesResponse = {
    items: MeWorkspaceItem[];
};
