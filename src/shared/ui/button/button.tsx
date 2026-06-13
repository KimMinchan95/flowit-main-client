import { cn } from '@shared/lib';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'light-blue' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonRounded = 'full' | 'lg' | 'xl';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    iconOnly?: boolean;
    fullWidth?: boolean;
    rounded?: ButtonRounded;
    shadow?: boolean;
};

const variantClassNameMap: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-emerald-600 text-white hover:bg-indigo-700',
    neutral:
        'bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg hover:bg-slate-100 transition-colors',
    'light-blue': 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
};

const sizeClassNameMap: Record<ButtonSize, string> = {
    sm: 'rounded-lg px-3 py-2 text-sm',
    md: 'rounded-xl px-4 py-3 text-sm',
    lg: 'rounded-xl px-5 py-3.5 text-base',
};

const roundedClassNameMap: Record<ButtonRounded, string> = {
    full: 'rounded-full',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
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
    rounded = 'lg',
    shadow = true,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex cursor-pointer items-center justify-center gap-2 font-bold transition-all',
                'disabled:pointer-events-none disabled:opacity-50',
                shadow && variant !== 'ghost' && 'shadow-sm',
                variantClassNameMap[variant],
                sizeClassNameMap[size],
                roundedClassNameMap[rounded],
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
