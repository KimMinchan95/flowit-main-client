'use client';

import { useRef } from 'react';

import { X } from 'lucide-react';

import { cn } from '@shared/lib';

type TaskTagInputProps = {
    tags: string[];
    tagInput: string;
    placeholder?: string;
    maxTags?: number;
    disabled?: boolean;
    onTagInputChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (tag: string) => void;
};

export function TaskTagInput({
    tags,
    tagInput,
    placeholder,
    maxTags,
    disabled = false,
    onTagInputChange,
    onAddTag,
    onRemoveTag,
}: TaskTagInputProps) {
    const isComposingRef = useRef(false);
    const isTagLimitReached = maxTags !== undefined && tags.length >= maxTags;
    const isInputDisabled = disabled || isTagLimitReached;
    const shouldShowPlaceholder = isTagLimitReached || tags.length === 0;
    const inputPlaceholder = shouldShowPlaceholder ? placeholder : '';

    const handleCompositionStart = () => {
        isComposingRef.current = true;
    };

    const handleCompositionEnd = () => {
        isComposingRef.current = false;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter' && event.key !== ',') {
            return;
        }

        if (event.nativeEvent.isComposing || isComposingRef.current || event.keyCode === 229) {
            return;
        }

        event.preventDefault();
        onAddTag();
    };

    return (
        <div
            className={cn(
                'flex min-h-[46px] w-full flex-wrap items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3.5 py-2.5 transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20',
            )}
        >
            {tags.map(tag => (
                <span
                    key={tag}
                    className="flex items-center gap-1.5 rounded border border-slate-200/60 bg-slate-100 px-2.5 py-1 text-xs font-bold tracking-wide text-slate-600"
                >
                    {tag}
                    <button
                        type="button"
                        className="text-slate-500 transition-colors hover:text-rose-500"
                        onClick={() => onRemoveTag(tag)}
                        disabled={disabled}
                        aria-label={`Remove ${tag}`}
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={tagInput}
                onChange={event => onTagInputChange(event.target.value)}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onKeyDown={handleKeyDown}
                disabled={isInputDisabled}
                className="min-w-[120px] flex-1 bg-transparent text-sm font-bold text-slate-700 outline-none disabled:cursor-not-allowed"
                placeholder={inputPlaceholder}
            />
        </div>
    );
}
