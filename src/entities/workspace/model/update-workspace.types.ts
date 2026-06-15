export type UpdateWorkspaceRequest = {
    name?: string;
    description?: string;
};

export type UpdateWorkspaceResponse = {
    id: number;
    name: string;
    description: string | null;
    inviteCode: string;
    createdAt: number;
    updatedAt: number;
};
