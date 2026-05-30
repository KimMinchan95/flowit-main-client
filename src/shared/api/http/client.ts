import { ApiError } from './api-error';
import { isApiErrorResponse, isApiSuccessResponse } from './parse-api-error';

import { getAccessToken } from '@shared/lib/auth';

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown;
    skipAuth?: boolean;
};

function getApiBaseUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
    }

    return baseUrl.replace(/\/$/, '');
}

function buildAuthHeaders(skipAuth?: boolean): Record<string, string> {
    if (skipAuth) {
        return {};
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
        return {};
    }

    return {
        Authorization: `Bearer ${accessToken}`,
    };
}

export async function apiRequest<TData>(path: string, options: RequestOptions = {}): Promise<TData> {
    const { body, headers, skipAuth, ...rest } = options;

    let response: Response;

    try {
        response = await fetch(`${getApiBaseUrl()}${path}`, {
            ...rest,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...buildAuthHeaders(skipAuth),
                ...headers,
            },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch (cause) {
        const message = cause instanceof Error ? cause.message : 'Network request failed';

        throw new ApiError(message, 0, null);
    }

    const responseBody: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const message = isApiErrorResponse(responseBody) ? responseBody.error.message : 'API request failed';

        throw new ApiError(message, response.status, responseBody);
    }

    if (!isApiSuccessResponse<TData>(responseBody)) {
        throw new ApiError('Invalid API response', response.status, responseBody);
    }

    return responseBody.data;
}
