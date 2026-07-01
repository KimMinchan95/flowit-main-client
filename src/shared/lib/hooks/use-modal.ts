'use client';

import { useState } from 'react';

type UseModalOptions = {
    defaultOpen?: boolean;
};

export function useModal({ defaultOpen = false }: UseModalOptions = {}) {
    const [open, setOpen] = useState(defaultOpen);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onToggle = () => {
        setOpen(prev => !prev);
    };

    return {
        open,
        setOpen,
        onOpen,
        onClose,
        onToggle,
    };
}
