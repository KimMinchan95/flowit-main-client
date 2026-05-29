export type ApiErrorPayload = {
    code: string;
    message: string;
};

export type ApiErrorResponse = {
    success: false;
    error: ApiErrorPayload;
    extensions: Record<string, unknown>;
};

export type ApiSuccessResponse<TData> = {
    success: true;
    data: TData;
    extensions: Record<string, unknown>;
};
