import { isGetWorkspaceTaskErrorCode } from '@entities/task';

import { getMappedApiErrorMessage } from '@shared/api';

import type { GetWorkspaceTaskErrorCode } from '@entities/task';

type GetTaskDetailErrorMessageParams = {
    error: unknown;
    fallback: string;
    unknownError: string;
    getKnownErrorMessage: (errorCode: GetWorkspaceTaskErrorCode) => string;
};

export function getTaskDetailErrorMessage({
    error,
    fallback,
    unknownError,
    getKnownErrorMessage,
}: GetTaskDetailErrorMessageParams) {
    return getMappedApiErrorMessage({
        error,
        fallback,
        unknownError,
        isKnownErrorCode: isGetWorkspaceTaskErrorCode,
        getKnownErrorMessage,
    });
}
