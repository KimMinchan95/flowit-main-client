type AccessTokenProvider = () => string | null;

let accessTokenProvider: AccessTokenProvider = () => null;

export function setAccessTokenProvider(provider: AccessTokenProvider) {
    accessTokenProvider = provider;
}

export function getAccessToken() {
    return accessTokenProvider();
}
