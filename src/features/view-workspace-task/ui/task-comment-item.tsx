'use client';

import { useState } from 'react';

import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import {
    isUpdateWorkspaceTaskCommentErrorCode,
    MAX_WORKSPACE_TASK_COMMENT_LENGTH,
    useUpdateWorkspaceTaskCommentMutation,
} from '@entities/task';

import { Button, MarkdownEditor } from '@shared/ui';
import { MarkdownPreview } from '@shared/ui/markdown-editor/markdown-preview';
import { getMappedApiErrorMessage } from '@shared/api';
import { formatEpochSecondsRelativeTime } from '@shared/lib/date';

import { isTaskCommentOwnedByMember } from '../lib/is-task-comment-owned-by-member';

import type { TaskComment } from '@entities/task';

type TaskCommentItemProps = {
    comment: TaskComment;
    workspaceId: string | number;
    taskId: number;
    myMemberId?: number;
    onDelete: (comment: TaskComment) => void;
};

export function TaskCommentItem({ comment, workspaceId, taskId, myMemberId, onDelete }: TaskCommentItemProps) {
    const locale = useLocale();
    const t = useTranslations('board.taskDetail');
    const tBoard = useTranslations('board');
    const tUpdateErrors = useTranslations('board.updateCommentErrors');
    const tCommon = useTranslations('common');

    const [isEditing, setIsEditing] = useState(false);
    const [editInput, setEditInput] = useState(comment.contentMarkdown);

    const {
        mutateAsync: updateCommentAsync,
        isPending: isUpdatePending,
        error: updateError,
        reset: resetUpdate,
    } = useUpdateWorkspaceTaskCommentMutation({ workspaceId, taskId });

    const canManageComment = isTaskCommentOwnedByMember(comment.author.memberId, myMemberId);
    const trimmedEditInput = editInput.trim();
    const isSaveDisabled = isUpdatePending || trimmedEditInput.length === 0;

    const updateErrorMessage = updateError
        ? getMappedApiErrorMessage({
              error: updateError,
              fallback: tBoard('updateCommentFailed'),
              unknownError: tBoard('updateCommentUnknownError'),
              isKnownErrorCode: isUpdateWorkspaceTaskCommentErrorCode,
              getKnownErrorMessage: errorCode => tUpdateErrors(errorCode),
          })
        : null;

    const handleStartEdit = () => {
        resetUpdate();
        setEditInput(comment.contentMarkdown);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        resetUpdate();
        setEditInput(comment.contentMarkdown);
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        if (isSaveDisabled) {
            return;
        }

        resetUpdate();

        try {
            await updateCommentAsync({
                commentId: comment.id,
                body: { contentMarkdown: trimmedEditInput },
            });
            setIsEditing(false);
        } catch {
            // surfaced via mutation state
        }
    };

    const handleEditChange = (value: string) => {
        setEditInput(value.slice(0, MAX_WORKSPACE_TASK_COMMENT_LENGTH));
    };

    return (
        <div className="flex gap-4">
            <MemberAvatar
                name={comment.author.displayName}
                workspaceId={workspaceId}
                memberId={comment.author.memberId}
                size="md"
            />
            <div className="flex-1 rounded-2xl rounded-tl-none border border-slate-100 bg-slate-50/80 p-4">
                <div className="mb-1.5 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-bold text-slate-900">{comment.author.displayName}</span>
                        <span className="text-xs font-medium text-slate-400">
                            {formatEpochSecondsRelativeTime(comment.createdAt, locale)}
                        </span>
                        {comment.edited ? (
                            <span className="text-xs font-medium text-slate-400">{t('edited')}</span>
                        ) : null}
                    </div>
                    {canManageComment && !isEditing ? (
                        <div className="flex shrink-0 items-center gap-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                shadow={false}
                                iconOnly
                                icon={<Pencil className="size-3.5" />}
                                className="size-7 rounded-md text-slate-400 hover:text-slate-700"
                                onClick={handleStartEdit}
                                aria-label={t('commentEdit')}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                shadow={false}
                                iconOnly
                                icon={<Trash2 className="size-3.5" />}
                                className="size-7 rounded-md text-slate-400 hover:text-rose-500"
                                onClick={() => onDelete(comment)}
                                aria-label={t('commentDelete')}
                            />
                        </div>
                    ) : null}
                </div>

                {isEditing ? (
                    <div className="space-y-3">
                        {updateErrorMessage ? (
                            <p className="text-sm font-bold text-rose-500">{updateErrorMessage}</p>
                        ) : null}
                        <MarkdownEditor
                            size="compact"
                            value={editInput}
                            onChange={handleEditChange}
                            maxLength={MAX_WORKSPACE_TASK_COMMENT_LENGTH}
                            disabled={isUpdatePending}
                            writeLabel={t('markdownWrite')}
                            previewLabel={t('markdownPreview')}
                            emptyPreviewLabel={t('markdownPreviewEmpty')}
                            expandLabel={t('markdownExpand')}
                            expandedTitle={t('commentEditExpandedTitle')}
                        />
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                shadow={false}
                                disabled={isUpdatePending}
                                onClick={handleCancelEdit}
                            >
                                {tCommon('cancel')}
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                disabled={isSaveDisabled}
                                onClick={() => void handleSaveEdit()}
                                className="min-w-[72px]"
                            >
                                {isUpdatePending ? (
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="size-4 animate-spin" />
                                        {t('commentEditSaving')}
                                    </span>
                                ) : (
                                    tCommon('save')
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <MarkdownPreview
                        value={comment.contentMarkdown}
                        emptyLabel=""
                        className="text-[15px] leading-relaxed text-slate-700"
                    />
                )}
            </div>
        </div>
    );
}
