export const SIGNUP_FORM_FIELDS = {
    EMAIL: 'email',
    // eslint-disable-next-line sonarjs/no-hardcoded-passwords
    PASSWORD_PLAIN: 'passwordPlain',
    NICKNAME: 'nickname',
} as const;

export type SignupFormField = (typeof SIGNUP_FORM_FIELDS)[keyof typeof SIGNUP_FORM_FIELDS];

export type SignupFormValues = {
    email: string;
    passwordPlain: string;
    nickname: string;
};

export const INITIAL_SIGNUP_FORM_VALUES: SignupFormValues = {
    email: '',
    passwordPlain: '',
    nickname: '',
};

export function isSignupFormField(name: string): name is SignupFormField {
    return name in INITIAL_SIGNUP_FORM_VALUES;
}
