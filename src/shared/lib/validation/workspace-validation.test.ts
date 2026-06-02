import { MAX_DEFAULT_LENGTH } from './auth-validation';
import { isValidWorkspaceName } from './workspace-validation';
import { describe, expect, it } from 'vitest';

describe('isValidWorkspaceName', () => {
    it('trim 후 1자 이상 64자 이하면 true', () => {
        expect(isValidWorkspaceName('워크스페이스')).toBe(true);
        expect(isValidWorkspaceName('  a  ')).toBe(true);
    });

    it('빈 문자열이거나 공백만 있으면 false', () => {
        expect(isValidWorkspaceName('')).toBe(false);
        expect(isValidWorkspaceName('   ')).toBe(false);
    });

    it('trim 후 64자 초과면 false', () => {
        expect(isValidWorkspaceName('가'.repeat(MAX_DEFAULT_LENGTH + 1))).toBe(false);
    });
});
