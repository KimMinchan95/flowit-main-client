import { MAX_DEFAULT_LENGTH } from './auth-validation';

export function isValidWorkspaceName(value: string) {
    const trimmed = value.trim();
    return trimmed.length > 0 && trimmed.length <= MAX_DEFAULT_LENGTH;
}
