type WorkspaceInviteEmailLocale = 'ko' | 'en';

type BuildWorkspaceInviteEmailParams = {
    workspaceName: string;
    inviteCode: string;
    inviteUrl: string;
    locale: WorkspaceInviteEmailLocale;
};

type WorkspaceInviteEmailContent = {
    subject: string;
    html: string;
};

const EMAIL_COPY: Record<
    WorkspaceInviteEmailLocale,
    {
        subject: (workspaceName: string) => string;
        greeting: string;
        body: (workspaceName: string) => string;
        codeLabel: string;
        cta: string;
        footer: string;
    }
> = {
    ko: {
        subject: workspaceName => `[Flowit] ${workspaceName} 워크스페이스 초대`,
        greeting: '안녕하세요,',
        body: workspaceName =>
            `${workspaceName} 워크스페이스에 초대되었습니다. 아래 초대 코드로 Flowit에 참여해 주세요.`,
        codeLabel: '초대 코드',
        cta: '워크스페이스 참여하기',
        footer: '이 메일은 Flowit에서 발송되었습니다.',
    },
    en: {
        subject: workspaceName => `[Flowit] Invitation to ${workspaceName}`,
        greeting: 'Hello,',
        body: workspaceName =>
            `You have been invited to join the ${workspaceName} workspace. Use the invitation code below to join Flowit.`,
        codeLabel: 'Invitation code',
        cta: 'Join workspace',
        footer: 'This email was sent by Flowit.',
    },
};

export function buildWorkspaceInviteEmail({
    workspaceName,
    inviteCode,
    inviteUrl,
    locale,
}: BuildWorkspaceInviteEmailParams): WorkspaceInviteEmailContent {
    const copy = EMAIL_COPY[locale];

    return {
        subject: copy.subject(workspaceName),
        html: `
<!DOCTYPE html>
<html lang="${locale}">
  <body style="margin:0;padding:24px;background-color:#F4F7FB;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:32px 32px 24px;">
          <div style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:16px;">Flowit</div>
          <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">${copy.greeting}</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#334155;">${copy.body(workspaceName)}</p>
          <div style="margin-bottom:24px;padding:16px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;">
            <div style="font-size:12px;font-weight:700;color:#64748b;margin-bottom:8px;">${copy.codeLabel}</div>
            <div style="font-size:18px;font-weight:800;letter-spacing:0.2em;color:#0f172a;">${inviteCode}</div>
          </div>
          <a href="${inviteUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 18px;border-radius:10px;">
            ${copy.cta}
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 24px;border-top:1px solid #f1f5f9;font-size:12px;color:#94a3b8;">
          ${copy.footer}
        </td>
      </tr>
    </table>
  </body>
</html>
        `.trim(),
    };
}

export function normalizeWorkspaceInviteEmailLocale(locale?: string): WorkspaceInviteEmailLocale {
    return locale === 'en' ? 'en' : 'ko';
}
