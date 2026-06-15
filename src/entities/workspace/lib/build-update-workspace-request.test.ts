import { buildUpdateWorkspaceRequest } from './build-update-workspace-request';
import { describe, expect, it } from 'vitest';

describe('buildUpdateWorkspaceRequest', () => {
    it('변경된 필드만 포함한다', () => {
        expect(
            buildUpdateWorkspaceRequest({
                name: '새 이름',
                description: '기존 설명',
                initialName: '기존 이름',
                initialDescription: '기존 설명',
            }),
        ).toEqual({ name: '새 이름' });
    });

    it('빈 description은 설명 제거로 전송한다', () => {
        expect(
            buildUpdateWorkspaceRequest({
                name: '기존 이름',
                description: '',
                initialName: '기존 이름',
                initialDescription: '기존 설명',
            }),
        ).toEqual({ description: '' });
    });

    it('변경 사항이 없으면 빈 객체를 반환한다', () => {
        expect(
            buildUpdateWorkspaceRequest({
                name: '기존 이름',
                description: '기존 설명',
                initialName: '기존 이름',
                initialDescription: '기존 설명',
            }),
        ).toEqual({});
    });
});
