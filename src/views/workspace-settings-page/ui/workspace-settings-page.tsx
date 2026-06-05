type Props = {
    workspaceId: string;
};

export function WorkspaceSettingsPage({ workspaceId }: Props) {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">Settings — workspace {workspaceId}</h1>
        </div>
    );
}
