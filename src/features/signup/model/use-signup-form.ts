'use client';

import { useCallback, useState } from 'react';

import { INITIAL_SIGNUP_FORM_VALUES, isSignupFormField } from './signup-form.types';

import type { SignupFormField, SignupFormValues } from './signup-form.types';
import type { ChangeEvent } from 'react';

export function useSignupForm() {
    const [signupFormValues, setSignupFormValues] = useState<SignupFormValues>(INITIAL_SIGNUP_FORM_VALUES);
    const [confirmPasswordPlain, setConfirmPasswordPlain] = useState('');

    const setField = useCallback(<K extends SignupFormField>(field: K, value: SignupFormValues[K]) => {
        setSignupFormValues(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            if (name === 'confirmPasswordPlain') {
                setConfirmPasswordPlain(value);
                return;
            }

            if (isSignupFormField(name)) {
                setField(name, value);
            }
        },
        [setField],
    );

    const reset = useCallback(() => {
        setSignupFormValues(INITIAL_SIGNUP_FORM_VALUES);
        setConfirmPasswordPlain('');
    }, []);

    return {
        signupFormValues,
        confirmPasswordPlain,
        setField,
        setConfirmPasswordPlain,
        handleChange,
        reset,
    };
}
