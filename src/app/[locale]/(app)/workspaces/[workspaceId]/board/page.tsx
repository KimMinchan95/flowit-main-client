import { Suspense } from 'react';

import { Loader2 } from 'lucide-react';

import { WorkspaceBoardPage } from '@views/workspace-board-page';

import { createMetaTitle } from '@shared/i18n/create-meta-title';

export const generateMetadata = createMetaTitle('board');

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Board({ params }: PageProps) {
    const { workspaceId } = await params;
    return (
        <Suspense
            fallback={
                <div className="flex h-full min-h-0 items-center justify-center p-8">
                    <Loader2 className="size-6 animate-spin text-slate-400" />
                </div>
            }
        >
            <WorkspaceBoardPage workspaceId={workspaceId} />
        </Suspense>
    );
}
