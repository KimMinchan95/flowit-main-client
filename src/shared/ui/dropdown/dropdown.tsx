'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { cn } from '@shared/lib';

import type { ReactElement } from 'react';

// 1. 드롭다운 상태를 공유할 Context 생성
const DropdownContext = createContext<{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
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

export const DropdownMenu = ({ children, className = 'right-0' }: DropdownMenuProps) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('DropdownMenu can only be used inside a Dropdown component.');

    if (!context.isOpen) return null;

    return (
        <div
            className={cn(
                'absolute z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-950',
                className,
            )}
        >
            {children}
        </div>
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
                'flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900',
                onClick && 'cursor-pointer',
                className,
            )}
        >
            {children}
        </button>
    );
};
