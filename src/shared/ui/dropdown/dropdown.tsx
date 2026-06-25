'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@shared/lib';

import type { ReactElement } from 'react';

// 1. 드롭다운 상태를 공유할 Context 생성
const DropdownContext = createContext<{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    menuRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);

export function useDropdown() {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('useDropdown can only be used inside a Dropdown component.');
    }

    return context;
}

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;

            if (containerRef.current?.contains(target) || menuRef.current?.contains(target)) {
                return;
            }

            setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, containerRef, menuRef }}>
            <div className="relative inline-block text-left" ref={containerRef}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

type DropdownTriggerChildProps = {
    onClick?: (e: React.MouseEvent) => void;
};

// 2. 드롭다운을 여닫는 Trigger (버튼 부분)
export const DropdownTrigger = ({ children }: { children: ReactElement<DropdownTriggerChildProps> }) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('DropdownTrigger can only be used inside a Dropdown component.');

    return React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
            children.props.onClick?.(e);
            context.setIsOpen(prev => !prev);
        },
    });
};

// 3. 드롭다운 메뉴 본체 (리스트 껍데기)
interface DropdownMenuProps {
    children: React.ReactNode;
    className?: string;
}

function getMenuPosition(container: HTMLDivElement) {
    const rect = container.getBoundingClientRect();

    return {
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
    };
}

export const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('DropdownMenu can only be used inside a Dropdown component.');

    const { isOpen, menuRef } = context;
    const [position, setPosition] = useState<{ top: number; right: number } | null>(null);

    useLayoutEffect(() => {
        const { containerRef } = context;

        if (!isOpen || !containerRef.current) {
            setPosition(null);
            return;
        }

        const updatePosition = () => {
            if (!containerRef.current) {
                return;
            }

            setPosition(getMenuPosition(containerRef.current));
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen || !position) {
        return null;
    }

    return createPortal(
        <div
            ref={menuRef}
            style={{ position: 'fixed', top: position.top, right: position.right, zIndex: 50 }}
            className={cn('w-48 rounded-xl border border-gray-100 bg-white p-1 shadow-lg', className)}
        >
            {children}
        </div>,
        document.body,
    );
};

// 4. 드롭다운 내부 아이템 (버튼/링크용)
interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const DropdownItem = ({ children, className, onClick, ...props }: DropdownItemProps) => {
    const context = useContext(DropdownContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        context?.setIsOpen(false);
    };

    return (
        <button
            {...props}
            onClick={handleClick}
            className={cn(
                'flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50',
                onClick && 'cursor-pointer',
                className,
            )}
        >
            {children}
        </button>
    );
};
