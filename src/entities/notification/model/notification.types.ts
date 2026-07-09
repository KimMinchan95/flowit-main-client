export type NotificationAlertType =
    | 'TASK_CREATED'
    | 'TASK_DATE_CHANGED'
    | 'TASK_STATUS_CHANGED'
    | 'TASK_PROGRESS_CHANGED'
    | 'TASK_ASSIGNED'
    | 'TASK_UNASSIGNED'
    | 'WORKSPACE_MEMBER_JOINED'
    | 'WORKSPACE_MEMBER_ROLE_CHANGED'
    | 'WORKSPACE_MEMBER_REMOVED'
    | 'WORKSPACE_ACCESS_REVOKED'
    | 'WORKSPACE_MEMBER_WITHDRAWN';

export type NotificationScopeType = 'WORKSPACE';

export type NotificationActorType = 'USER';

export type NotificationSubjectType = 'TASK' | 'WORKSPACE_MEMBER';

export type NotificationLinkType = 'NONE' | 'TASK_DETAIL' | 'WORKSPACE_MEMBERS';

export type NotificationProfileSourceType = 'ACTOR' | 'SUBJECT' | 'RECIPIENT';

export type NotificationProfile = {
    source: NotificationProfileSourceType;
    profileImageUrl: string | null;
    displayName: string | null;
};

export type NotificationScope = {
    type: NotificationScopeType;
    id: number;
    name: string;
};

export type NotificationActor = {
    type: NotificationActorType;
    id: number | null;
    name: string | null;
};

export type NotificationSubject = {
    type: NotificationSubjectType;
    id: number;
    name: string;
};

export type NotificationChange = {
    element: string;
    from: unknown | null;
    to: unknown | null;
};

export type NotificationLink = {
    type: NotificationLinkType;
    workspaceId: number | null;
};

export type Notification = {
    id: number;
    type: NotificationAlertType;
    occurredAt: number;
    profile: NotificationProfile;
    scope: NotificationScope;
    actor: NotificationActor;
    subject: NotificationSubject;
    changes: NotificationChange[];
    link: NotificationLink;
    read: boolean;
};

export type NotificationsResponse = {
    items: Notification[];
    totalCount: number;
    unreadCount: number;
    unseenCount: number;
};

export type GetNotificationsParams = {
    page?: number;
    size?: number;
};
