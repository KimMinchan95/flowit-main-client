export function getLastPageIndex(totalCount: number, pageSize: number): number {
    if (pageSize <= 0) {
        return 0;
    }

    return Math.max(0, Math.ceil(totalCount / pageSize) - 1);
}

export function getLastPageIndexAfterItemAdded(totalCount: number, pageSize: number): number {
    return getLastPageIndex(totalCount + 1, pageSize);
}
