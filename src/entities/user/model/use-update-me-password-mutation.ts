'use client';

import { updateMePasswordMutationKeys } from './update-me-password-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { updateMePassword } from '../api';

import type { UpdateMePasswordRequest } from './update-me-password.types';

export function useUpdateMePasswordMutation() {
    return useMutation({
        mutationKey: updateMePasswordMutationKeys.update(),
        mutationFn: (body: UpdateMePasswordRequest) => updateMePassword(body),
    });
}
