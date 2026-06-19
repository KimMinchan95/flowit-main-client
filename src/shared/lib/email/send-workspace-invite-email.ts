import { buildWorkspaceInviteEmail, normalizeWorkspaceInviteEmailLocale } from './workspace-invite-email';
import { Resend } from 'resend';

type SendWorkspaceInviteEmailParams = {
    to: string;
    workspaceName: string;
    inviteCode: string;
    inviteUrl: string;
    locale?: string;
};

function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not configured');
    }

    return new Resend(apiKey);
}

const DEFAULT_RESEND_FROM_EMAIL = 'Flowit <onboarding@resend.dev>';

export async function sendWorkspaceInviteEmail({
    to,
    workspaceName,
    inviteCode,
    inviteUrl,
    locale,
}: SendWorkspaceInviteEmailParams) {
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? DEFAULT_RESEND_FROM_EMAIL;

    const normalizedLocale = normalizeWorkspaceInviteEmailLocale(locale);
    const { subject, html } = buildWorkspaceInviteEmail({
        workspaceName,
        inviteCode,
        inviteUrl,
        locale: normalizedLocale,
    });

    const resend = getResendClient();

    const { error } = await resend.emails.send({
        from: fromEmail,
        to,
        subject,
        html,
    });

    if (error) {
        throw new Error(error.message);
    }
}
