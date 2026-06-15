'use client';

import { useCallback, useState } from 'react';

type UseModalOptions = {
    defaultOpen?: boolean;
};

export function useModal({ defaultOpen = false }: UseModalOptions = {}) {
    const [open, setOpen] = useState(defaultOpen);

    const onOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    const onToggle = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    return {
        open,
        setOpen,
        onOpen,
        onClose,
        onToggle,
    };
}
