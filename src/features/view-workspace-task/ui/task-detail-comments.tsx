'use client';

import { useState } from 'react';

import { Loader2, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import {
    isCreateWorkspaceTaskCommentErrorCode,
    isGetWorkspaceTaskCommentsErrorCode,
    MAX_WORKSPACE_TASK_COMMENT_LENGTH,
    useCreateWorkspaceTaskCommentMutation,
    useWorkspaceTaskCommentsQuery,
} from '@entities/task';

import { MarkdownPreview } from '@shared/ui/markdown-editor/markdown-preview';
import { getMappedApiErrorMessage } from '@shared/api';
import { formatEpochSeconds } from '@shared/lib/date';

import type { KeyboardEvent } from 'react';

type TaskDetailCommentsProps = {
    workspaceId: string | number;
    taskId: number;
};

export function TaskDetailComments({ workspaceId, taskId }: TaskDetailCommentsProps) {
    const t = useTranslations('board.taskDetail');
    const tBoard = useTranslations('board');
    const tErrors = useTranslations('board.taskCommentErrors');
    const tCreateErrors = useTranslations('board.createCommentErrors');

    const [commentInput, setCommentInput] = useState('');

    const {
        data: commentPage,
        isPending: isCommentsPending,
        isError: isCommentsError,
        error: commentsError,
    } = useWorkspaceTaskCommentsQuery({ workspaceId, taskId });

    const {
        mutateAsync: createCommentAsync,
        isPending: isCreatePending,
        error: createError,
        reset: resetCreate,
    } = useCreateWorkspaceTaskCommentMutation({ workspaceId, taskId });

    const comments = commentPage?.items ?? [];
    const totalCount = commentPage?.totalCount ?? 0;
    const trimmedComment = commentInput.trim();
    const isSubmitDisabled = isCreatePending || trimmedComment.length === 0;

    const commentsErrorMessage = isCommentsError
        ? getMappedApiErrorMessage({
              error: commentsError,
              fallback: t('commentsLoadFailed'),
              unknownError: tBoard('createCommentUnknownError'),
              isKnownErrorCode: isGetWorkspaceTaskCommentsErrorCode,
              getKnownErrorMessage: errorCode => tErrors(errorCode),
          })
        : null;

    const createErrorMessage = createError
        ? getMappedApiErrorMessage({
              error: createError,
              fallback: tBoard('createCommentFailed'),
              unknownError: tBoard('createCommentUnknownError'),
              isKnownErrorCode: isCreateWorkspaceTaskCommentErrorCode,
              getKnownErrorMessage: errorCode => tCreateErrors(errorCode),
          })
        : null;

    const handleSubmitComment = async () => {
        if (isSubmitDisabled) {
            return;
        }

        resetCreate();

        try {
            await createCommentAsync({ contentMarkdown: trimmedComment });
            setCommentInput('');
        } catch {
            // surfaced via mutation state
        }
    };

    const handleCommentKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
            return;
        }

        event.preventDefault();
        void handleSubmitComment();
    };

    return (
        <div className="flex flex-1 flex-col justify-between">
            <div className="mb-8 space-y-6">
                {isCommentsPending ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="size-5 animate-spin text-slate-400" />
                    </div>
                ) : null}

                {commentsErrorMessage ? (
                    <p className="py-8 text-center text-sm font-medium text-rose-500">{commentsErrorMessage}</p>
                ) : null}

                {!isCommentsPending && !commentsErrorMessage && comments.length > 0
                    ? comments.map(comment => (
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
                    : null}

                {!isCommentsPending && !commentsErrorMessage && comments.length === 0 ? (
                    <p className="py-8 text-center text-sm font-medium text-slate-400">{t('noComments')}</p>
                ) : null}

                {!isCommentsPending && !commentsErrorMessage && totalCount > comments.length ? (
                    <p className="text-center text-xs font-medium text-slate-400">
                        {t('commentsTruncated', { shown: comments.length, total: totalCount })}
                    </p>
                ) : null}
            </div>

            <div className="mt-auto mb-6 pb-2">
                {createErrorMessage ? (
                    <p className="mb-3 text-sm font-bold text-rose-500">{createErrorMessage}</p>
                ) : null}
                <div className="relative">
                    <input
                        type="text"
                        value={commentInput}
                        onChange={event => setCommentInput(event.target.value)}
                        onKeyDown={handleCommentKeyDown}
                        maxLength={MAX_WORKSPACE_TASK_COMMENT_LENGTH}
                        placeholder={t('commentPlaceholder')}
                        disabled={isCreatePending || isCommentsPending || Boolean(commentsErrorMessage)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-12 pl-5 text-[15px] shadow-sm transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                    <button
                        type="button"
                        onClick={() => void handleSubmitComment()}
                        disabled={isSubmitDisabled || isCommentsPending || Boolean(commentsErrorMessage)}
                        aria-label={t('commentPlaceholder')}
                        className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isCreatePending ? <Loader2 className="size-4 animate-spin" /> : <Plus size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
