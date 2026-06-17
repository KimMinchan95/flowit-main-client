export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export type TaskAssignee = {
    memberId: number;
    userId: number;
    name: string;
    email: string;
};

export type Task = {
    id: number;
    workspaceId: number;
    title: string;
    status: TaskStatus;
    assignee: TaskAssignee | null;
    priority: TaskPriority;
    startDate: number | null;
    dueDate: number | null;
    tags: string[];
    progress: number;
    createdAt: number;
    updatedAt: number;
};

export type WorkspaceTasksResponse = {
    items: Task[];
    totalCount: number;
};

export type GetWorkspaceTasksParams = {
    status?: TaskStatus;
    assigneeMemberId?: number;
    tag?: string;
    keyword?: string;
    dueFrom?: number;
    dueTo?: number;
    page?: number;
    size?: number;
};
