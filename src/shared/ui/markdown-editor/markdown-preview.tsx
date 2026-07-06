'use client';

import { markdownPreviewComponents } from './markdown-preview-components';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { cn } from '@shared/lib';

type MarkdownPreviewProps = {
    value: string;
    emptyLabel: string;
    className?: string;
};

export function MarkdownPreview({ value, emptyLabel, className }: MarkdownPreviewProps) {
    if (!value.trim()) {
        return <p className={cn('text-sm font-medium text-slate-400', className)}>{emptyLabel}</p>;
    }

    return (
        <div
            className={cn(
                'text-sm leading-relaxed text-slate-900 [&>*+*]:mt-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
                className,
            )}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownPreviewComponents}>
                {value}
            </ReactMarkdown>
        </div>
    );
}
