const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 24;
export const MAX_DEFAULT_LENGTH = 64;

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

export function isValidEmail(value: string) {
    const normalized = value.trim();
    const atIndex = normalized.indexOf('@');

    if (atIndex <= 0 || atIndex !== normalized.lastIndexOf('@')) {
        return false;
    }

    const localPart = normalized.slice(0, atIndex);
    const domainPart = normalized.slice(atIndex + 1);
    const dotIndex = domainPart.lastIndexOf('.');

    if (localPart.length === 0 || dotIndex <= 0 || dotIndex >= domainPart.length - 1) {
        return false;
    }

    return !normalized.includes(' ') && normalized.length <= MAX_DEFAULT_LENGTH;
}

export function isValidPassword(value: string) {
    return value.length >= PASSWORD_MIN_LENGTH && value.length < PASSWORD_MAX_LENGTH && passwordPattern.test(value);
}

export function isValidName(value: string) {
    return 2 <= value.trim().length && value.trim().length <= MAX_DEFAULT_LENGTH;
}

export function isPasswordConfirmed(password: string, confirmPassword: string) {
    return password === confirmPassword;
}
