import { cn } from '@shared/lib';

import type { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
    title?: ReactNode;
};

export function Card({ children, className, title }: CardProps) {
    return (
        <div className={cn('rounded-lg border border-slate-200/60 bg-white p-7 shadow-sm', className)}>
            {title ? <h2 className="mb-6 border-b border-slate-100 pb-3 font-bold text-slate-900">{title}</h2> : null}
            {children}
        </div>
    );
}
