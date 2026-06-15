import { getApiErrorCode, getApiErrorMessage } from '@shared/api';

import { isWorkspaceWithdrawErrorCode } from '../model/workspace-withdraw-error-codes';

import type { WorkspaceWithdrawErrorCode } from '../model/workspace-withdraw-error-codes';

type GetWorkspaceWithdrawErrorMessageParams = {
    error: unknown;
    fallback: string;
    unknownError: string;
    getKnownErrorMessage: (errorCode: WorkspaceWithdrawErrorCode) => string;
};

export function getWorkspaceWithdrawErrorMessage({
    error,
    fallback,
    unknownError,
    getKnownErrorMessage,
}: GetWorkspaceWithdrawErrorMessageParams) {
    const errorCode = getApiErrorCode(error);

    if (!errorCode) {
        return getApiErrorMessage(error, fallback);
    }

    if (isWorkspaceWithdrawErrorCode(errorCode)) {
        return getKnownErrorMessage(errorCode);
    }

    return unknownError;
}
