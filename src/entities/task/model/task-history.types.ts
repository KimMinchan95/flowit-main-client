export type TaskHistoryActor = {
    memberId: number | null;
    userId: number | null;
    displayName: string;
};

export type TaskHistoryTarget = {
    type: 'TASK';
    taskId: number;
    displayName: string;
};

export type TaskHistoryChange = {
    element: string;
    from?: unknown;
    to?: unknown;
};

export type TaskHistoryItem = {
    id: number;
    occurredAt: number;
    actor: TaskHistoryActor;
    target: TaskHistoryTarget;
    action: string;
    changes: TaskHistoryChange[];
};

export type TaskHistoryPage = {
    items: TaskHistoryItem[];
    totalCount: number;
};
