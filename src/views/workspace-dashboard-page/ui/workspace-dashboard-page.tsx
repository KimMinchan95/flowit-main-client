type Props = {
    workspaceId: string;
};

export function WorkspaceDashboardPage({ workspaceId }: Props) {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">Dashboard — workspace {workspaceId}</h1>
        </div>
    );
}
