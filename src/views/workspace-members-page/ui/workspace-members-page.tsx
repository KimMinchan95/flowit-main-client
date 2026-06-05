type Props = {
    workspaceId: string;
};

export function WorkspaceMembersPage({ workspaceId }: Props) {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">Members — workspace {workspaceId}</h1>
        </div>
    );
}
