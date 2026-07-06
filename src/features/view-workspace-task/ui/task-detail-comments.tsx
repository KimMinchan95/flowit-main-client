'use client';

import { useState } from 'react';

import { ListPagination } from './list-pagination';
import { TaskCommentDeleteModal } from './task-comment-delete-modal';
import { TaskCommentItem } from './task-comment-item';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkspaceMembersQuery } from '@entities/member';
import {
    isCreateWorkspaceTaskCommentErrorCode,
    isGetWorkspaceTaskCommentsErrorCode,
    MAX_WORKSPACE_TASK_COMMENT_LENGTH,
    useCreateWorkspaceTaskCommentMutation,
    useWorkspaceTaskCommentsQuery,
} from '@entities/task';
import { useMeUserQuery } from '@entities/user';

import { Button, MarkdownEditor } from '@shared/ui';
import { getMappedApiErrorMessage } from '@shared/api';

import { getLastPageIndex, getLastPageIndexAfterItemAdded } from '../lib/get-last-page-index';

import type { TaskComment } from '@entities/task';

const TASK_DETAIL_COMMENTS_PAGE_SIZE = 20;

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
    const [page, setPage] = useState(0);
    const [deletingComment, setDeletingComment] = useState<TaskComment | null>(null);

    const { data: meUser } = useMeUserQuery();
    const { data: membersData } = useWorkspaceMembersQuery({ workspaceId });

    const myMemberId = membersData?.members.find(member => member.email === meUser?.email)?.memberId;

    const {
        data: commentPage,
        isPending: isCommentsPending,
        isError: isCommentsError,
        error: commentsError,
    } = useWorkspaceTaskCommentsQuery({
        workspaceId,
        taskId,
        page,
        size: TASK_DETAIL_COMMENTS_PAGE_SIZE,
    });

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
            setPage(getLastPageIndexAfterItemAdded(totalCount, TASK_DETAIL_COMMENTS_PAGE_SIZE));
        } catch {
            // surfaced via mutation state
        }
    };

    const handleCommentDeleted = () => {
        const remainingCount = Math.max(0, totalCount - 1);
        const lastPage = getLastPageIndex(remainingCount, TASK_DETAIL_COMMENTS_PAGE_SIZE);

        if (page > lastPage) {
            setPage(lastPage);
        }
    };

    return (
        <>
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
                              <TaskCommentItem
                                  key={comment.id}
                                  comment={comment}
                                  workspaceId={workspaceId}
                                  taskId={taskId}
                                  myMemberId={myMemberId}
                                  onDelete={setDeletingComment}
                              />
                          ))
                        : null}

                    {!isCommentsPending && !commentsErrorMessage && comments.length === 0 ? (
                        <p className="py-8 text-center text-sm font-medium text-slate-400">{t('noComments')}</p>
                    ) : null}

                    {!isCommentsPending && !commentsErrorMessage ? (
                        <ListPagination
                            page={page}
                            pageSize={TASK_DETAIL_COMMENTS_PAGE_SIZE}
                            totalCount={totalCount}
                            onPageChange={setPage}
                        />
                    ) : null}
                </div>

                <div className="mt-auto mb-6 space-y-3 pb-2">
                    {createErrorMessage ? (
                        <p className="text-sm font-bold text-rose-500">{createErrorMessage}</p>
                    ) : null}
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

            {deletingComment ? (
                <TaskCommentDeleteModal
                    open
                    workspaceId={workspaceId}
                    taskId={taskId}
                    comment={deletingComment}
                    onClose={() => setDeletingComment(null)}
                    onDeleted={handleCommentDeleted}
                />
            ) : null}
        </>
    );
}
