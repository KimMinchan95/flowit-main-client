export type UpdateMePasswordRequest = {
    currentPassword: string;
    newPassword: string;
};

export type UpdateMePasswordResponse = Record<string, never>;
