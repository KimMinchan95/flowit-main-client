import { getApiErrorCode, getApiErrorMessage } from '@shared/api';

import { isJoinInviteCodeErrorCode } from '../model/join-invite-code-error-codes';

import type { JoinInviteCodeErrorCode } from '../model/join-invite-code-error-codes';

type GetJoinInviteCodeErrorMessageParams = {
    error: unknown;
    fallback: string;
    unknownError: string;
    getKnownErrorMessage: (errorCode: JoinInviteCodeErrorCode) => string;
};

export function getJoinInviteCodeErrorMessage({
    error,
    fallback,
    unknownError,
    getKnownErrorMessage,
}: GetJoinInviteCodeErrorMessageParams) {
    const errorCode = getApiErrorCode(error);

    if (!errorCode) {
        return getApiErrorMessage(error, fallback);
    }

    if (isJoinInviteCodeErrorCode(errorCode)) {
        return getKnownErrorMessage(errorCode);
    }

    return unknownError;
}
