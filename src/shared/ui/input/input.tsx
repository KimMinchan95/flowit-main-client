import { forwardRef } from 'react';

import { cn } from '@shared/lib';

import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
    return (
        <input
            ref={ref}
            className={cn(
                'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium transition-all outline-none',
                'focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20',
                className,
            )}
            {...props}
        />
    );
});
