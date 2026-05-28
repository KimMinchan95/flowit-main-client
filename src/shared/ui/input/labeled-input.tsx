import { useId } from 'react';

import { Input } from './input';
import { CircleAlert, CircleCheck } from 'lucide-react';

import { cn } from '@shared/lib';

import type { InputHTMLAttributes } from 'react';

type LabeledInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    containerClassName?: string;
    labelClassName?: string;
    errorMessage?: string;
    isError?: boolean;
    value?: string;
};

export function LabeledInput({
    label,
    containerClassName,
    labelClassName,
    errorMessage,
    isError,
    value,
    ...inputProps
}: LabeledInputProps) {
    const inputId = useId();

    const empty = value === '';
    const success = value && !isError;
    const error = value && isError;

    return (
        <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
            <label htmlFor={inputId} className={cn('text-sm font-bold text-slate-700', labelClassName)}>
                {label}
            </label>
            <Input
                className={cn(success && 'border-emerald-600', error && 'border-red-500')}
                id={inputId}
                {...inputProps}
            />
            {errorMessage && (
                <p
                    className={cn(
                        'flex items-center gap-1.5 text-xs font-bold',
                        empty && 'text-slate-500 transition-colors',
                        success && 'text-emerald-600 transition-colors',
                        error && 'text-rose-500 transition-colors',
                    )}
                >
                    {error && <CircleAlert className={cn('size-3', error && 'text-rose-500')} />}
                    {!error && <CircleCheck className={cn('size-3', error && 'text-emerald-600')} />}
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
