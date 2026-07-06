'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@shared/ui';

type ListPaginationProps = {
    page: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (page: number) => void;
};

export function ListPagination({ page, pageSize, totalCount, onPageChange }: ListPaginationProps) {
    const t = useTranslations('common');

    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) {
        return null;
    }

    const currentPage = page + 1;
    const hasPrev = page > 0;
    const hasNext = page < totalPages - 1;

    return (
        <div className="flex items-center justify-center gap-3 py-2">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                shadow={false}
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrev}
                icon={<ChevronLeft className="size-4" />}
            >
                {t('paginationPrev')}
            </Button>
            <span className="min-w-16 text-center text-sm font-medium text-slate-500">
                {t('paginationPage', { current: currentPage, total: totalPages })}
            </span>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                shadow={false}
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNext}
                icon={<ChevronRight className="size-4" />}
                iconPosition="right"
            >
                {t('paginationNext')}
            </Button>
        </div>
    );
}
