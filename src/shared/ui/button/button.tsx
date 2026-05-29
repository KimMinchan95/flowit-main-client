import { cn } from '@shared/lib';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    iconOnly?: boolean;
    fullWidth?: boolean;
};

const variantClassNameMap: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    neutral: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
};

const sizeClassNameMap: Record<ButtonSize, string> = {
    sm: 'rounded-lg px-3 py-2 text-sm',
    md: 'rounded-xl px-4 py-3 text-sm',
    lg: 'rounded-xl px-5 py-3.5 text-base',
};

export function Button({
    children,
    className,
    type = 'button',
    variant = 'primary',
    size = 'lg',
    icon,
    iconPosition = 'left',
    iconOnly = false,
    fullWidth = false,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'mt-4 inline-flex items-center justify-center gap-2 font-bold shadow-sm transition-all',
                'disabled:pointer-events-none disabled:opacity-50',
                variantClassNameMap[variant],
                sizeClassNameMap[size],
                iconOnly && 'aspect-square p-0',
                fullWidth && 'w-full',
                className,
            )}
            {...props}
        >
            {icon && iconPosition === 'left' ? icon : null}
            {!iconOnly ? children : <span className="sr-only">{children}</span>}
            {icon && iconPosition === 'right' ? icon : null}
        </button>
    );
}
