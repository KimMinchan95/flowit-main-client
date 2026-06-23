'use client';

import { useState } from 'react';

import { MarkdownEditorExpandedModal } from './markdown-editor-expanded-modal';
import { MarkdownPreview } from './markdown-preview';
import { Maximize2 } from 'lucide-react';

import { Button, Textarea } from '@shared/ui';
import { cn } from '@shared/lib';

const ACTIVE_CLASSNAME = 'bg-white text-slate-900 shadow-sm hover:bg-white';
const INACTIVE_CLASSNAME = 'text-slate-500 hover:bg-transparent hover:text-slate-700';

const TEXTAREA_CLASSNAME =
    'h-full min-h-full resize-none border-0 bg-transparent p-1 font-medium text-slate-900 shadow-none focus:border-transparent focus:bg-transparent focus:ring-0';

type MarkdownEditorTab = 'write' | 'preview';

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeightClassName?: string;
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
    minHeightClassName = 'min-h-[200px] lg:min-h-[360px]',
    writeLabel = 'Write',
    previewLabel = 'Preview',
    emptyPreviewLabel = 'Nothing to preview yet.',
    expandLabel = 'Expand',
    expandedTitle = 'Write',
}: MarkdownEditorProps) {
    const [activeTab, setActiveTab] = useState<MarkdownEditorTab>('write');
    const [isExpanded, setIsExpanded] = useState(false);

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
                        icon={<Maximize2 className="size-4" />}
                        className="rounded-md text-slate-500 hover:bg-white hover:text-slate-700"
                        onClick={() => setIsExpanded(true)}
                        aria-label={expandLabel}
                    >
                        {expandLabel}
                    </Button>
                </div>

                <div className={cn('p-3', minHeightClassName)}>
                    {activeTab === 'write' ? (
                        <Textarea
                            value={value}
                            onChange={event => onChange(event.target.value)}
                            placeholder={placeholder}
                            className={TEXTAREA_CLASSNAME}
                        />
                    ) : (
                        <MarkdownPreview
                            value={value}
                            emptyLabel={emptyPreviewLabel}
                            className="h-full overflow-y-auto"
                        />
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
