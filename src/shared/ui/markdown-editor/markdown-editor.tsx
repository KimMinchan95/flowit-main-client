'use client';

import { useState } from 'react';

import { MarkdownPreview } from './markdown-preview';

import { Button, Textarea } from '@shared/ui';
import { cn } from '@shared/lib';

const ACTIVE_CLASSNAME = 'bg-white text-slate-900 shadow-sm hover:bg-white';
const INACTIVE_CLASSNAME = 'text-slate-500 hover:bg-transparent hover:text-slate-700';

type MarkdownEditorTab = 'write' | 'preview';

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeightClassName?: string;
    writeLabel?: string;
    previewLabel?: string;
    emptyPreviewLabel?: string;
};

export function MarkdownEditor({
    value,
    onChange,
    placeholder,
    minHeightClassName = 'min-h-[200px] lg:min-h-[360px]',
    writeLabel = 'Write',
    previewLabel = 'Preview',
    emptyPreviewLabel = 'Nothing to preview yet.',
}: MarkdownEditorProps) {
    const [activeTab, setActiveTab] = useState<MarkdownEditorTab>('write');

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
            <div className="flex gap-1 border-b border-slate-100 bg-slate-50 p-1.5">
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

            <div className={cn('p-3', minHeightClassName)}>
                {activeTab === 'write' ? (
                    <Textarea
                        value={value}
                        onChange={event => onChange(event.target.value)}
                        placeholder={placeholder}
                        className="h-full min-h-full resize-none border-0 bg-transparent p-1 font-medium text-slate-900 shadow-none focus:border-transparent focus:bg-transparent focus:ring-0"
                    />
                ) : (
                    <MarkdownPreview value={value} emptyLabel={emptyPreviewLabel} className="h-full overflow-y-auto" />
                )}
            </div>
        </div>
    );
}
