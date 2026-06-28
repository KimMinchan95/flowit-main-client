'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';

import { MarkdownPreview } from '@shared/ui/markdown-editor/markdown-preview';
import { formatEpochSeconds } from '@shared/lib/date';

import type { TaskComment } from '@entities/task';

type TaskDetailCommentsProps = {
    comments: TaskComment[];
    totalCount: number;
};

export function TaskDetailComments({ comments, totalCount }: TaskDetailCommentsProps) {
    const t = useTranslations('board.taskDetail');

    return (
        <div className="flex flex-1 flex-col justify-between">
            <div className="mb-8 space-y-6">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                            <MemberAvatar name={comment.author.displayName} size="md" />
                            <div className="flex-1 rounded-2xl rounded-tl-none border border-slate-100 bg-slate-50/80 p-4">
                                <div className="mb-1.5 flex items-center gap-2">
                                    <span className="text-[15px] font-bold text-slate-900">
                                        {comment.author.displayName}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        {formatEpochSeconds(comment.createdAt, 'YYYY.MM.DD HH:mm')}
                                    </span>
                                    {comment.edited ? (
                                        <span className="text-xs font-medium text-slate-400">{t('edited')}</span>
                                    ) : null}
                                </div>
                                <MarkdownPreview
                                    value={comment.contentMarkdown}
                                    emptyLabel=""
                                    className="text-[15px] text-slate-700"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="py-8 text-center text-sm font-medium text-slate-400">{t('noComments')}</p>
                )}
                {totalCount > comments.length ? (
                    <p className="text-center text-xs font-medium text-slate-400">
                        {t('commentsTruncated', { shown: comments.length, total: totalCount })}
                    </p>
                ) : null}
            </div>

            <div className="relative mt-auto mb-6 pb-2">
                <input
                    type="text"
                    disabled
                    placeholder={t('commentPlaceholder')}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-12 pl-5 text-[15px] shadow-sm transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <button
                    type="button"
                    disabled
                    className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
}
