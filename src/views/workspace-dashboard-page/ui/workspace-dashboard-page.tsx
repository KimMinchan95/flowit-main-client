'use client';

import { DashboardBackground } from './dashboard-background';
import { DashboardHeader } from './dashboard-header';
import { DashboardIndicatorCards } from './dashboard-indicator-cards';
import { DashboardMyTasks } from './dashboard-my-tasks';
import { DashboardRecentActivities } from './dashboard-recent-activities';
import { useTranslations } from 'next-intl';

import {
    isGetWorkspaceTaskIndicatorsErrorCode,
    isGetWorkspaceTasksErrorCode,
    useWorkspaceTaskIndicatorsQuery,
    useWorkspaceTasksQuery,
} from '@entities/task';
import { useMeUserQuery } from '@entities/user';
import { isGetWorkspaceActivityRecordsErrorCode, useWorkspaceActivityRecordsQuery } from '@entities/workspace';

import { getMappedApiErrorMessage } from '@shared/api';

type Props = {
    workspaceId: string;
};

const MY_TASKS_SIZE = 8;
const ACTIVITY_RECORDS_SIZE = 8;

export function WorkspaceDashboardPage({ workspaceId }: Props) {
    const t = useTranslations('dashboard');
    const tIndicatorsErrors = useTranslations('dashboard.indicatorsLoadErrors');
    const tTasksErrors = useTranslations('dashboard.tasksLoadErrors');
    const tActivitiesErrors = useTranslations('dashboard.activitiesLoadErrors');

    const { data: meUser, isPending: isMeUserPending } = useMeUserQuery();
    const {
        data: indicators,
        isPending: isIndicatorsPending,
        isError: isIndicatorsError,
        error: indicatorsError,
    } = useWorkspaceTaskIndicatorsQuery({ workspaceId });
    const {
        data: tasksData,
        isPending: isTasksPending,
        isError: isTasksError,
        error: tasksError,
    } = useWorkspaceTasksQuery({
        workspaceId,
        params: { mine: true, size: MY_TASKS_SIZE },
    });
    const {
        data: activitiesData,
        isPending: isActivitiesPending,
        isError: isActivitiesError,
        error: activitiesError,
    } = useWorkspaceActivityRecordsQuery({
        workspaceId,
    });

    const userName = meUser?.nickname ?? '';
    const tasks = (tasksData?.items ?? []).slice(0, MY_TASKS_SIZE);
    const activities = (activitiesData?.items ?? []).slice(0, ACTIVITY_RECORDS_SIZE);

    const indicatorsErrorMessage = isIndicatorsError
        ? getMappedApiErrorMessage({
              error: indicatorsError,
              fallback: t('indicatorsLoadFailed'),
              unknownError: t('indicatorsLoadUnknownError'),
              isKnownErrorCode: isGetWorkspaceTaskIndicatorsErrorCode,
              getKnownErrorMessage: errorCode => tIndicatorsErrors(errorCode),
          })
        : null;

    const tasksErrorMessage = isTasksError
        ? getMappedApiErrorMessage({
              error: tasksError,
              fallback: t('tasksLoadFailed'),
              unknownError: t('tasksLoadUnknownError'),
              isKnownErrorCode: isGetWorkspaceTasksErrorCode,
              getKnownErrorMessage: errorCode => tTasksErrors(errorCode),
          })
        : null;

    const activitiesErrorMessage = isActivitiesError
        ? getMappedApiErrorMessage({
              error: activitiesError,
              fallback: t('activitiesLoadFailed'),
              unknownError: t('activitiesLoadUnknownError'),
              isKnownErrorCode: isGetWorkspaceActivityRecordsErrorCode,
              getKnownErrorMessage: errorCode => tActivitiesErrors(errorCode),
          })
        : null;

    return (
        <div className="animate-in fade-in relative flex min-h-full flex-col px-8 pt-8 pb-12 duration-500 xl:h-full xl:min-h-0 xl:overflow-hidden">
            <DashboardBackground />
            <DashboardHeader userName={userName} isPending={isMeUserPending} />
            <DashboardIndicatorCards
                indicators={indicators}
                isPending={isIndicatorsPending}
                isError={isIndicatorsError}
                errorMessage={indicatorsErrorMessage}
            />
            <div className="relative z-10 grid grid-cols-1 gap-6 xl:min-h-0 xl:flex-1 xl:grid-cols-12 xl:grid-rows-1">
                <DashboardMyTasks
                    workspaceId={workspaceId}
                    tasks={tasks}
                    isPending={isTasksPending}
                    isError={isTasksError}
                    errorMessage={tasksErrorMessage}
                />
                <DashboardRecentActivities
                    workspaceId={workspaceId}
                    activities={activities}
                    isPending={isActivitiesPending}
                    isError={isActivitiesError}
                    errorMessage={activitiesErrorMessage}
                />
            </div>
        </div>
    );
}
