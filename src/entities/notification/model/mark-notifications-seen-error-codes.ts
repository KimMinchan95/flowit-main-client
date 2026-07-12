export const MARK_NOTIFICATIONS_SEEN_ERROR_CODES = {
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type MarkNotificationsSeenErrorCode = keyof typeof MARK_NOTIFICATIONS_SEEN_ERROR_CODES;

export function isMarkNotificationsSeenErrorCode(code: string): code is MarkNotificationsSeenErrorCode {
    return code in MARK_NOTIFICATIONS_SEEN_ERROR_CODES;
}
