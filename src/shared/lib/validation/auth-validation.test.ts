import {
    isPasswordConfirmed,
    isValidEmail,
    isValidName,
    isValidPassword,
    MAX_DEFAULT_LENGTH,
    PASSWORD_MAX_LENGTH,
} from './auth-validation';
import { describe, expect, it } from 'vitest';

describe('isValidEmail', () => {
    it('유효한 이메일이면 true', () => {
        expect(isValidEmail('user@example.com')).toBe(true);
        expect(isValidEmail('  user@example.com  ')).toBe(true);
    });

    it('@가 없거나 여러 개이면 false', () => {
        expect(isValidEmail('userexample.com')).toBe(false);
        expect(isValidEmail('user@@example.com')).toBe(false);
        expect(isValidEmail('@example.com')).toBe(false);
    });

    it('도메인에 .이 없거나 TLD가 없으면 false', () => {
        expect(isValidEmail('user@example')).toBe(false);
        expect(isValidEmail('user@.com')).toBe(false);
        expect(isValidEmail('user@example.')).toBe(false);
    });

    it('공백 포함 또는 최대 길이 초과면 false', () => {
        expect(isValidEmail('user @example.com')).toBe(false);
        expect(isValidEmail(`${'a'.repeat(MAX_DEFAULT_LENGTH)}@b.co`)).toBe(false);
    });
});

describe('isValidPassword', () => {
    it('8자 이상 24자 미만, 영문+숫자 조합이면 true', () => {
        expect(isValidPassword('password1')).toBe(true);
        expect(isValidPassword('Abcd1234')).toBe(true);
    });

    it('길이가 범위 밖이면 false', () => {
        expect(isValidPassword('pass1')).toBe(false);
        expect(isValidPassword('a'.repeat(PASSWORD_MAX_LENGTH))).toBe(false);
    });

    it('영문 또는 숫자만 있으면 false', () => {
        expect(isValidPassword('password')).toBe(false);
        expect(isValidPassword('12345678')).toBe(false);
    });

    it('영문·숫자 외 문자가 있으면 false', () => {
        expect(isValidPassword('password1!')).toBe(false);
        expect(isValidPassword('pass word1')).toBe(false);
    });
});

describe('isValidName', () => {
    it('trim 후 2자 이상 64자 이하면 true', () => {
        expect(isValidName('김철수')).toBe(true);
        expect(isValidName('  ab  ')).toBe(true);
    });

    it('trim 후 2자 미만이면 false', () => {
        expect(isValidName('a')).toBe(false);
        expect(isValidName('   ')).toBe(false);
        expect(isValidName('')).toBe(false);
    });

    it('trim 후 64자 초과면 false', () => {
        expect(isValidName('가'.repeat(MAX_DEFAULT_LENGTH + 1))).toBe(false);
    });
});

describe('isPasswordConfirmed', () => {
    it('비밀번호가 같으면 true', () => {
        expect(isPasswordConfirmed('password1', 'password1')).toBe(true);
    });

    it('비밀번호가 다르면 false', () => {
        expect(isPasswordConfirmed('password1', 'password2')).toBe(false);
    });
});
