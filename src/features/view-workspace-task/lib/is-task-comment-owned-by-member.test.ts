import { isTaskCommentOwnedByMember } from './is-task-comment-owned-by-member';
import { describe, expect, it } from 'vitest';

describe('isTaskCommentOwnedByMember', () => {
    it('작성자 memberId와 내 memberId가 같으면 true를 반환한다', () => {
        expect(isTaskCommentOwnedByMember(12, 12)).toBe(true);
    });

    it('memberId가 다르면 false를 반환한다', () => {
        expect(isTaskCommentOwnedByMember(12, 34)).toBe(false);
    });

    it('내 memberId를 알 수 없으면 false를 반환한다', () => {
        expect(isTaskCommentOwnedByMember(12, undefined)).toBe(false);
    });
});
