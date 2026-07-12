export const GET_NOTIFICATIONS_ERROR_CODES = {
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type GetNotificationsErrorCode = keyof typeof GET_NOTIFICATIONS_ERROR_CODES;

export function isGetNotificationsErrorCode(code: string): code is GetNotificationsErrorCode {
    return code in GET_NOTIFICATIONS_ERROR_CODES;
}
