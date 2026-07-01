'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import {
    isCreateWorkspaceTaskCommentErrorCode,
    isGetWorkspaceTaskCommentsErrorCode,
    MAX_WORKSPACE_TASK_COMMENT_LENGTH,
    useCreateWorkspaceTaskCommentMutation,
    useWorkspaceTaskCommentsQuery,
} from '@entities/task';

import { Button, MarkdownEditor } from '@shared/ui';
import { MarkdownPreview } from '@shared/ui/markdown-editor/markdown-preview';
import { getMappedApiErrorMessage } from '@shared/api';
import { formatRelativeEpochSeconds } from '@shared/lib/date';

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

    const commentsErrorMessage = isCommentsError
        ? getMappedApiErrorMessage({
              error: commentsError,
              fallback: t('commentsLoadFailed'),
              unknownError: tBoard('createCommentUnknownError'),
              isKnownErrorCode: isGetWorkspaceTaskCommentsErrorCode,
              getKnownErrorMessage: errorCode => tErrors(errorCode),
          })
        : null;

    const isInputDisabled = isCreatePending || isCommentsPending || Boolean(commentsErrorMessage);
    const isSubmitDisabled = isCreatePending || trimmedComment.length === 0 || isInputDisabled;

    const createErrorMessage = createError
        ? getMappedApiErrorMessage({
              error: createError,
              fallback: tBoard('createCommentFailed'),
              unknownError: tBoard('createCommentUnknownError'),
              isKnownErrorCode: isCreateWorkspaceTaskCommentErrorCode,
              getKnownErrorMessage: errorCode => tCreateErrors(errorCode),
          })
        : null;

    const handleCommentChange = (value: string) => {
        setCommentInput(value.slice(0, MAX_WORKSPACE_TASK_COMMENT_LENGTH));
    };

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
                              <MemberAvatar
                                  name={comment.author.displayName}
                                  workspaceId={workspaceId}
                                  memberId={comment.author.memberId}
                                  size="md"
                              />
                              <div className="flex-1 rounded-2xl rounded-tl-none border border-slate-100 bg-slate-50/80 p-4">
                                  <div className="mb-1.5 flex items-center gap-2">
                                      <span className="text-[15px] font-bold text-slate-900">
                                          {comment.author.displayName}
                                      </span>
                                      <span className="text-xs font-medium text-slate-400">
                                          {formatRelativeEpochSeconds(comment.createdAt, {
                                              justNow: t('relativeTime.justNow'),
                                              minutesAgo: count => t('relativeTime.minutesAgo', { count }),
                                              hoursAgo: count => t('relativeTime.hoursAgo', { count }),
                                              daysAgo: count => t('relativeTime.daysAgo', { count }),
                                          })}
                                      </span>
                                      {comment.edited ? (
                                          <span className="text-xs font-medium text-slate-400">{t('edited')}</span>
                                      ) : null}
                                  </div>
                                  <MarkdownPreview
                                      value={comment.contentMarkdown}
                                      emptyLabel=""
                                      className="text-[15px] leading-relaxed text-slate-700"
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

            <div className="mt-auto mb-6 space-y-3 pb-2">
                {createErrorMessage ? <p className="text-sm font-bold text-rose-500">{createErrorMessage}</p> : null}
                <MarkdownEditor
                    size="compact"
                    value={commentInput}
                    onChange={handleCommentChange}
                    placeholder={t('commentPlaceholder')}
                    maxLength={MAX_WORKSPACE_TASK_COMMENT_LENGTH}
                    disabled={isInputDisabled}
                    writeLabel={t('markdownWrite')}
                    previewLabel={t('markdownPreview')}
                    emptyPreviewLabel={t('markdownPreviewEmpty')}
                    expandLabel={t('markdownExpand')}
                    expandedTitle={t('commentMarkdownExpandedTitle')}
                />
                <div className="flex items-center justify-end gap-3">
                    <span className="text-xs font-medium text-slate-400">
                        {t('commentLength', {
                            count: commentInput.length,
                            max: MAX_WORKSPACE_TASK_COMMENT_LENGTH,
                        })}
                    </span>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => void handleSubmitComment()}
                        disabled={isSubmitDisabled}
                        className="min-w-[96px]"
                    >
                        {isCreatePending ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                {t('commentSubmitting')}
                            </span>
                        ) : (
                            t('commentSubmit')
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
