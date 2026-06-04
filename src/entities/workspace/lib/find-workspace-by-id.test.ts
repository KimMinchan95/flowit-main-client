import { findWorkspaceById } from './find-workspace-by-id';
import { describe, expect, it } from 'vitest';

import type { Workspace } from '../model/workspace.type';

const workspaces: Workspace[] = [
    {
        id: 12,
        name: 'App 개발팀',
        description: null,
        memberCount: 3,
        role: 'OWNER',
        joinedAt: 0,
    },
];

describe('findWorkspaceById', () => {
    it('숫자 id와 문자열 workspaceId를 동일하게 매칭한다', () => {
        expect(findWorkspaceById(workspaces, 12)?.name).toBe('App 개발팀');
        expect(findWorkspaceById(workspaces, '12')?.name).toBe('App 개발팀');
    });

    it('없는 id면 undefined를 반환한다', () => {
        expect(findWorkspaceById(workspaces, 99)).toBeUndefined();
    });
});
