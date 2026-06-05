type Props = {
    workspaceId: string;
};

export function WorkspaceMyPagePage({ workspaceId }: Props) {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">My Page — workspace {workspaceId}</h1>
        </div>
    );
}
