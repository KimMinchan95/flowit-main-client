import { apiRequest } from '@shared/api/http';

import type { WithdrawMemberResponse } from '../model/withdraw-member.types';

export function withdrawMember(workspaceId: string | number) {
    return apiRequest<WithdrawMemberResponse>(`/v1/workspaces/${workspaceId}/members/withdraw`, {
        method: 'DELETE',
    });
}
