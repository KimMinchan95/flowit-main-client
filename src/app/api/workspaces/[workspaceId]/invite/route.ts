import { NextResponse } from 'next/server';

import { isValidEmail } from '@shared/lib';
import { sendWorkspaceInviteEmail } from '@shared/lib/email';

import type { WorkspaceDetail } from '@entities/workspace';

type InviteRequestBody = {
    email?: string;
    locale?: string;
};

function getApiProxyTarget() {
    return process.env.API_PROXY_TARGET ?? 'http://localhost:8080';
}

function getAppOrigin(request: Request) {
    return request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

async function getWorkspaceDetail(workspaceId: string, authorization: string) {
    const response = await fetch(`${getApiProxyTarget()}/v1/workspaces/${workspaceId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: authorization,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        return null;
    }

    const body: unknown = await response.json().catch(() => null);

    if (!body || typeof body !== 'object' || !('data' in body)) {
        return null;
    }

    return (body as { data: WorkspaceDetail }).data;
}

export async function POST(request: Request, { params }: { params: Promise<{ workspaceId: string }> }) {
    const { workspaceId } = await params;
    const authorization = request.headers.get('authorization');

    if (!authorization) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: InviteRequestBody;

    try {
        body = (await request.json()) as InviteRequestBody;
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const workspace = await getWorkspaceDetail(workspaceId, authorization);

    if (!workspace) {
        return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    const locale = body.locale === 'en' ? 'en' : 'ko';
    const inviteUrl = `${getAppOrigin(request)}/${locale}/workspaces`;

    try {
        await sendWorkspaceInviteEmail({
            to: email,
            workspaceName: workspace.name,
            inviteCode: workspace.inviteCode,
            inviteUrl,
            locale,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to send invite email';

        return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
