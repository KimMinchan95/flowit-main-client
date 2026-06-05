export const CREATE_WORKSPACE_FORM_ID = 'create-workspace-form';

export const CREATE_WORKSPACE_FORM_FIELDS = {
    NAME: 'name',
    DESCRIPTION: 'description',
} as const;

export type CreateWorkspaceFormField = (typeof CREATE_WORKSPACE_FORM_FIELDS)[keyof typeof CREATE_WORKSPACE_FORM_FIELDS];

export type CreateWorkspaceFormValues = Record<CreateWorkspaceFormField, string>;

export const INITIAL_CREATE_WORKSPACE_FORM_VALUES: CreateWorkspaceFormValues = {
    [CREATE_WORKSPACE_FORM_FIELDS.NAME]: '',
    [CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION]: '',
};

export function isCreateWorkspaceFormField(name: string): name is CreateWorkspaceFormField {
    return name in INITIAL_CREATE_WORKSPACE_FORM_VALUES;
}
