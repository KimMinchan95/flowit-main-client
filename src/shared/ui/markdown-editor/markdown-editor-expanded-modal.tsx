import { MarkdownPreview } from './markdown-preview';

import { Modal, Textarea } from '@shared/ui';

type MarkdownEditorExpandedModalProps = {
    open: boolean;
    title: string;
    value: string;
    placeholder?: string;
    writeLabel: string;
    previewLabel: string;
    emptyPreviewLabel: string;
    onChange: (value: string) => void;
    onClose: () => void;
};

export function MarkdownEditorExpandedModal({
    open,
    title,
    value,
    placeholder,
    writeLabel,
    previewLabel,
    emptyPreviewLabel,
    onChange,
    onClose,
}: MarkdownEditorExpandedModalProps) {
    return (
        <Modal
            open={open}
            title={title}
            onClose={onClose}
            className="flex max-h-[calc(100dvh-2rem)] max-w-6xl flex-col"
            overlayClassName="z-[60]"
            captureEscape
        >
            <div className="grid min-h-[min(70dvh,640px)] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                <div className="flex min-h-0 flex-col">
                    <span className="mb-2 text-xs font-bold tracking-wide text-slate-500 uppercase">{writeLabel}</span>
                    <Textarea
                        value={value}
                        onChange={event => onChange(event.target.value)}
                        placeholder={placeholder}
                        className="min-h-[240px] flex-1 resize-none rounded-xl border border-slate-200/80 bg-white p-4 text-sm font-medium text-slate-900 shadow-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 lg:min-h-0"
                    />
                </div>

                <div className="flex min-h-0 flex-col border-t border-slate-100 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                    <span className="mb-2 text-xs font-bold tracking-wide text-slate-500 uppercase">
                        {previewLabel}
                    </span>
                    <div className="min-h-[240px] flex-1 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/60 p-4 lg:min-h-0">
                        <MarkdownPreview value={value} emptyLabel={emptyPreviewLabel} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
