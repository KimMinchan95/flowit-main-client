export const GET_WORKSPACE_TASK_INDICATORS_ERROR_CODES = {
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type GetWorkspaceTaskIndicatorsErrorCode = keyof typeof GET_WORKSPACE_TASK_INDICATORS_ERROR_CODES;

export function isGetWorkspaceTaskIndicatorsErrorCode(code: string): code is GetWorkspaceTaskIndicatorsErrorCode {
    return code in GET_WORKSPACE_TASK_INDICATORS_ERROR_CODES;
}
