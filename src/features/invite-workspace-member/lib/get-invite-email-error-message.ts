import { getApiErrorMessage } from '@shared/api';

type GetInviteEmailErrorMessageParams = {
    error: unknown;
    fallback: string;
    sandboxHint: string;
};

export function getInviteEmailErrorMessage({ error, fallback, sandboxHint }: GetInviteEmailErrorMessageParams) {
    const message = getApiErrorMessage(error, fallback);

    if (message.includes('only send testing emails to your own email address')) {
        return sandboxHint;
    }

    return message;
}
