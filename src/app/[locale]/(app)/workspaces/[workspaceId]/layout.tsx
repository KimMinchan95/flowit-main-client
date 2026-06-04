import { WorkspaceSidebar } from '@entities/workspace';

type Props = {
    params: Promise<{ workspaceId: string }>;
    children: React.ReactNode;
};

export default async function WorkspaceIdLayout({ params, children }: Props) {
    const { workspaceId } = await params;

    return (
        <div className="flex h-full min-h-0 w-full flex-1">
            <WorkspaceSidebar workspaceId={workspaceId} />
            <main className="min-h-0 flex-1 overflow-auto">{children}</main>
        </div>
    );
}
