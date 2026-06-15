import type { UpdateWorkspaceRequest } from '../model/update-workspace.types';

type BuildUpdateWorkspaceRequestParams = {
    name: string;
    description: string;
    initialName: string;
    initialDescription: string;
};

export function buildUpdateWorkspaceRequest({
    name,
    description,
    initialName,
    initialDescription,
}: BuildUpdateWorkspaceRequestParams): UpdateWorkspaceRequest {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const initialNameTrimmed = initialName.trim();
    const initialDescriptionTrimmed = initialDescription.trim();

    const body: UpdateWorkspaceRequest = {};

    if (trimmedName !== initialNameTrimmed) {
        body.name = trimmedName;
    }

    if (trimmedDescription !== initialDescriptionTrimmed) {
        body.description = trimmedDescription;
    }

    return body;
}
