import { getAccessToken } from '@shared/lib/auth';

type SendWorkspaceInviteEmailRequest = {
    workspaceId: string;
    email: string;
    locale: string;
};

export async function sendWorkspaceInviteEmailRequest({ workspaceId, email, locale }: SendWorkspaceInviteEmailRequest) {
    const accessToken = getAccessToken();

    const response = await fetch(`/api/workspaces/${workspaceId}/invite`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ email, locale }),
    });

    if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Failed to send invite email');
    }
}
