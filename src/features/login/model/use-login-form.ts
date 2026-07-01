'use client';

import { useState } from 'react';

import { INITIAL_LOGIN_FORM_VALUES, isLoginFormField } from './login-form.types';

import type { LoginFormField, LoginFormValues } from './login-form.types';
import type { ChangeEvent } from 'react';

export function useLoginForm() {
    const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>(INITIAL_LOGIN_FORM_VALUES);

    const setField = <K extends LoginFormField>(field: K, value: LoginFormValues[K]) => {
        setLoginFormValues(prev => ({ ...prev, [field]: value }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (isLoginFormField(name)) {
            setField(name, value);
        }
    };

    const reset = () => {
        setLoginFormValues(INITIAL_LOGIN_FORM_VALUES);
    };

    return {
        loginFormValues,
        setField,
        handleChange,
        reset,
    };
}
