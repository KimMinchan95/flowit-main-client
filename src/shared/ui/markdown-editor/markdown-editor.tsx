'use client';

import { useState } from 'react';

import { MarkdownEditorExpandedModal } from './markdown-editor-expanded-modal';
import { MarkdownPreview } from './markdown-preview';
import { Maximize2 } from 'lucide-react';

import { Button, Textarea } from '@shared/ui';
import { cn } from '@shared/lib';

const ACTIVE_CLASSNAME = 'bg-white text-slate-900 shadow-sm hover:bg-white';
const INACTIVE_CLASSNAME = 'text-slate-500 hover:bg-transparent hover:text-slate-700';

const EDITOR_SIZE_CLASSNAMES = {
    default: {
        wrapper: 'min-h-[320px] lg:min-h-[400px]',
        content: 'min-h-[280px] lg:min-h-[320px]',
        field: 'min-h-[280px] lg:min-h-[320px]',
        rows: 12,
    },
    compact: {
        wrapper: 'min-h-[120px]',
        content: 'min-h-[100px]',
        field: 'min-h-[100px]',
        rows: 4,
    },
} as const;

type MarkdownEditorTab = 'write' | 'preview';
type MarkdownEditorSize = keyof typeof EDITOR_SIZE_CLASSNAMES;

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    size?: MarkdownEditorSize;
    minHeightClassName?: string;
    maxLength?: number;
    disabled?: boolean;
    writeLabel?: string;
    previewLabel?: string;
    emptyPreviewLabel?: string;
    expandLabel?: string;
    expandedTitle?: string;
};

export function MarkdownEditor({
    value,
    onChange,
    placeholder,
    size = 'default',
    minHeightClassName,
    maxLength,
    disabled = false,
    writeLabel = 'Write',
    previewLabel = 'Preview',
    emptyPreviewLabel = 'Nothing to preview yet.',
    expandLabel = 'Expand',
    expandedTitle = 'Write',
}: MarkdownEditorProps) {
    const [activeTab, setActiveTab] = useState<MarkdownEditorTab>('write');
    const [isExpanded, setIsExpanded] = useState(false);

    const sizeClassNames = EDITOR_SIZE_CLASSNAMES[size];
    const wrapperMinHeightClassName = minHeightClassName ?? sizeClassNames.wrapper;

    const textareaClassName = cn(
        'flex-1 resize-none rounded-xl border border-slate-200/80 bg-white p-4 text-sm font-medium text-slate-900 shadow-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20',
        sizeClassNames.field,
    );

    const previewPanelClassName = cn(
        'flex-1 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/60 p-4',
        sizeClassNames.field,
    );

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 p-1.5">
                    <div className="flex gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            shadow={false}
                            disabled={disabled}
                            className={cn(
                                'rounded-md px-3 py-1.5',
                                activeTab === 'write' ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME,
                            )}
                            onClick={() => setActiveTab('write')}
                        >
                            {writeLabel}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            shadow={false}
                            disabled={disabled}
                            className={cn(
                                'rounded-md px-3 py-1.5',
                                activeTab === 'preview' ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME,
                            )}
                            onClick={() => setActiveTab('preview')}
                        >
                            {previewLabel}
                        </Button>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        shadow={false}
                        iconOnly
                        disabled={disabled}
                        icon={<Maximize2 className="size-4" />}
                        className="rounded-md text-slate-500 hover:bg-white hover:text-slate-700"
                        onClick={() => setIsExpanded(true)}
                        aria-label={expandLabel}
                    >
                        {expandLabel}
                    </Button>
                </div>

                <div className={cn('flex flex-col p-3', wrapperMinHeightClassName, sizeClassNames.content)}>
                    {activeTab === 'write' ? (
                        <Textarea
                            value={value}
                            onChange={event => onChange(event.target.value)}
                            placeholder={placeholder}
                            rows={sizeClassNames.rows}
                            maxLength={maxLength}
                            disabled={disabled}
                            className={textareaClassName}
                        />
                    ) : (
                        <div className={previewPanelClassName}>
                            <MarkdownPreview value={value} emptyLabel={emptyPreviewLabel} />
                        </div>
                    )}
                </div>
            </div>

            <MarkdownEditorExpandedModal
                open={isExpanded}
                title={expandedTitle}
                value={value}
                placeholder={placeholder}
                writeLabel={writeLabel}
                previewLabel={previewLabel}
                emptyPreviewLabel={emptyPreviewLabel}
                onChange={onChange}
                onClose={() => setIsExpanded(false)}
            />
        </>
    );
}
