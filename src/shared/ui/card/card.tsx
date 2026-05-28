import { clsx } from 'clsx';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export function Card({ children, className }: CardProps) {
    return (
        <div className={clsx('bg-white rounded-lg shadow-sm p-7 border border-slate-200/60', className)}>
            {children}
        </div>
    );
}
