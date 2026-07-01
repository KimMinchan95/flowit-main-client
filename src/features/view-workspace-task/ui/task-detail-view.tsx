'use client';

import { useState } from 'react';

import { TaskDetailActivity } from './task-detail-activity';
import { TaskDetailComments } from './task-detail-comments';
import { TaskDetailMeta } from './task-detail-meta';
import { useTranslations } from 'next-intl';

import { useWorkspaceTaskCommentsQuery } from '@entities/task';

import { MarkdownPreview } from '@shared/ui/markdown-editor/markdown-preview';
import { cn } from '@shared/lib';

import type { TaskDetail } from '@entities/task';

export type TaskDetailViewMode = 'center' | 'side';

type TaskDetailTab = 'comments' | 'activity';

type TaskDetailViewProps = {
    workspaceId: string;
    task: TaskDetail;
    viewMode: TaskDetailViewMode;
};

export function TaskDetailView({ workspaceId, task, viewMode }: TaskDetailViewProps) {
    const t = useTranslations('board.taskDetail');
    const [activeTab, setActiveTab] = useState<TaskDetailTab>('comments');

    const { data: commentPage } = useWorkspaceTaskCommentsQuery({
        workspaceId,
        taskId: task.id,
    });

    const commentCount = commentPage?.totalCount ?? task.commentPage.totalCount;
    const isCenter = viewMode === 'center';

    const descriptionSection = (
        <div className={cn(isCenter ? 'px-8' : 'px-8 pb-2')}>
            <h3 className="mb-3 text-[15px] font-bold text-slate-900">{t('description')}</h3>
            <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <MarkdownPreview
                    value={task.descriptionMarkdown ?? ''}
                    emptyLabel={t('descriptionEmpty')}
                    className="text-[14px] leading-relaxed text-slate-700"
                />
            </div>
        </div>
    );

    const tabsSection = (
        <div className={cn('flex flex-1 flex-col', isCenter ? 'border-t border-slate-100 px-8 pt-8' : 'px-8 pt-6')}>
            <div className="mb-6 flex items-center gap-6 border-b border-slate-100">
                <button
                    type="button"
                    onClick={() => setActiveTab('comments')}
                    className={cn(
                        '-mb-[2px] px-1 pb-3 text-[15px] transition-colors',
                        activeTab === 'comments'
                            ? 'border-b-2 border-blue-600 font-bold text-blue-600'
                            : 'font-medium text-slate-400 hover:text-slate-700',
                    )}
                >
                    {t('commentsTab', { count: commentCount })}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('activity')}
                    className={cn(
                        '-mb-[2px] px-1 pb-3 text-[15px] transition-colors',
                        activeTab === 'activity'
                            ? 'border-b-2 border-blue-600 font-bold text-blue-600'
                            : 'font-medium text-slate-400 hover:text-slate-700',
                    )}
                >
                    {t('activityTab')}
                </button>
            </div>

            {activeTab === 'comments' ? (
                <TaskDetailComments workspaceId={workspaceId} taskId={task.id} />
            ) : (
                <TaskDetailActivity workspaceId={workspaceId} taskId={task.id} />
            )}
        </div>
    );

    if (isCenter) {
        return (
            <div className="flex min-h-0 flex-1 overflow-hidden">
                <div className="flex min-w-0 flex-1 flex-col overflow-y-auto border-r border-slate-100 py-8">
                    {descriptionSection}
                    {tabsSection}
                </div>
                <TaskDetailMeta workspaceId={workspaceId} task={task} className="w-[360px] shrink-0 bg-slate-50/50" />
            </div>
        );
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <TaskDetailMeta workspaceId={workspaceId} task={task} className="border-b border-slate-100" />
            {descriptionSection}
            {tabsSection}
        </div>
    );
}
