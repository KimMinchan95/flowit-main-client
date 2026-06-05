type Props = {
    workspaceId: string;
};

export function WorkspaceBoardPage({ workspaceId }: Props) {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">Board — workspace {workspaceId}</h1>
        </div>
    );
}
