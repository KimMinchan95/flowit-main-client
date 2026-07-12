export const MARK_NOTIFICATIONS_READ_ALL_ERROR_CODES = {
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type MarkNotificationsReadAllErrorCode = keyof typeof MARK_NOTIFICATIONS_READ_ALL_ERROR_CODES;

export function isMarkNotificationsReadAllErrorCode(code: string): code is MarkNotificationsReadAllErrorCode {
    return code in MARK_NOTIFICATIONS_READ_ALL_ERROR_CODES;
}
