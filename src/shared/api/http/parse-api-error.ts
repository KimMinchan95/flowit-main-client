import { ApiError } from './api-error';

import type { ApiErrorResponse, ApiSuccessResponse } from './api-response.types';

export function isApiErrorResponse(body: unknown): body is ApiErrorResponse {
    if (typeof body !== 'object' || body === null) {
        return false;
    }

    const candidate = body as ApiErrorResponse;

    return (
        candidate.success === false &&
        typeof candidate.error === 'object' &&
        candidate.error !== null &&
        typeof candidate.error.code === 'string' &&
        typeof candidate.error.message === 'string'
    );
}

export function isApiSuccessResponse<TData>(body: unknown): body is ApiSuccessResponse<TData> {
    if (typeof body !== 'object' || body === null) {
        return false;
    }

    const candidate = body as ApiSuccessResponse<TData>;

    return candidate.success === true && 'data' in candidate;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
    if (error instanceof ApiError) {
        if (isApiErrorResponse(error.body)) {
            return error.body.error.message;
        }

        return error.message;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
}

export function getApiErrorCode(error: unknown) {
    if (error instanceof ApiError && isApiErrorResponse(error.body)) {
        return error.body.error.code;
    }

    return undefined;
}

type GetMappedApiErrorMessageParams<TErrorCode extends string> = {
    error: unknown;
    fallback: string;
    unknownError: string;
    isKnownErrorCode: (code: string) => code is TErrorCode;
    getKnownErrorMessage: (errorCode: TErrorCode) => string;
};

export function getMappedApiErrorMessage<TErrorCode extends string>({
    error,
    fallback,
    unknownError,
    isKnownErrorCode,
    getKnownErrorMessage,
}: GetMappedApiErrorMessageParams<TErrorCode>) {
    const errorCode = getApiErrorCode(error);

    if (!errorCode) {
        return getApiErrorMessage(error, fallback);
    }

    if (isKnownErrorCode(errorCode)) {
        return getKnownErrorMessage(errorCode);
    }

    return unknownError;
}
