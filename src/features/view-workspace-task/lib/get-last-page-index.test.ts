import { getLastPageIndex, getLastPageIndexAfterItemAdded } from './get-last-page-index';
import { describe, expect, it } from 'vitest';

const TASK_DETAIL_COMMENTS_PAGE_SIZE = 20;

describe('getLastPageIndex', () => {
    it('항목이 없으면 0페이지를 반환한다', () => {
        expect(getLastPageIndex(0, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
    });

    it('한 페이지를 채우기 전까지는 0페이지를 반환한다', () => {
        expect(getLastPageIndex(1, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
        expect(getLastPageIndex(19, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
    });

    it('페이지 크기의 배수일 때 이전 페이지 인덱스를 반환한다', () => {
        expect(getLastPageIndex(20, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
        expect(getLastPageIndex(40, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(1);
        expect(getLastPageIndex(60, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(2);
    });

    it('페이지가 넘어가는 순간 마지막 페이지 인덱스가 증가한다', () => {
        expect(getLastPageIndex(21, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(1);
        expect(getLastPageIndex(39, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(1);
        expect(getLastPageIndex(41, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(2);
    });
});

describe('getLastPageIndexAfterItemAdded', () => {
    it('첫 댓글 추가 후 0페이지로 이동한다', () => {
        expect(getLastPageIndexAfterItemAdded(0, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
    });

    it('첫 페이지가 가득 차기 직전까지는 0페이지에 머문다', () => {
        expect(getLastPageIndexAfterItemAdded(18, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
        expect(getLastPageIndexAfterItemAdded(19, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
    });

    it('20번째 댓글 추가 후에도 0페이지에 머문다', () => {
        expect(getLastPageIndexAfterItemAdded(19, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(0);
    });

    it('21번째 댓글 추가 후 1페이지로 이동한다', () => {
        expect(getLastPageIndexAfterItemAdded(20, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(1);
    });

    it('두 번째 페이지가 가득 찬 뒤 추가하면 2페이지로 이동한다', () => {
        expect(getLastPageIndexAfterItemAdded(39, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(1);
        expect(getLastPageIndexAfterItemAdded(40, TASK_DETAIL_COMMENTS_PAGE_SIZE)).toBe(2);
    });
});
