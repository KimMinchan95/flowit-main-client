export type RefreshAccessTokenData = {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshTokenExpiresIn: number;
};

export type SaveAccessTokenParams = {
    accessToken: string;
};
