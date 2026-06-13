'use client';

import { useEffect, useId } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@shared/lib';

import type { ReactNode } from 'react';

type ModalProps = {
    open: boolean;
    title: string;
    description?: string;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
    onClose?: () => void;
    showCloseButton?: boolean;
};

export function Modal({
    open,
    title,
    description,
    children,
    footer,
    className,
    onClose,
    showCloseButton = true,
}: ModalProps) {
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {onClose ? (
                <button
                    type="button"
                    className="absolute inset-0 bg-slate-900/50"
                    aria-label="Close"
                    onClick={onClose}
                />
            ) : (
                <div className="absolute inset-0 bg-slate-900/50" aria-hidden />
            )}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
                className={cn('relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl', className)}
            >
                {title || (showCloseButton && onClose) ? (
                    <div className="relative flex shrink-0 items-center justify-center border-b border-slate-100 px-2 pb-4">
                        {title && (
                            <h2 id={titleId} className="text-lg font-bold text-slate-900">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && onClose && (
                            <button
                                type="button"
                                className="absolute top-0 right-0 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                ) : null}
                {description ? (
                    <p id={descriptionId} className="mt-2 text-center text-sm text-slate-600">
                        {description}
                    </p>
                ) : null}
                <div className="py-3">{children}</div>
                {footer ? <div className="flex shrink-0 items-center justify-end pt-4">{footer}</div> : null}
            </div>
        </div>,
        document.body,
    );
}
