import { AccountInfo } from './account-info';
import { JoinedWorkspaces } from './joined-workspaces';
import { UserProfile } from './user-profile';
import { useTranslations } from 'next-intl';

import { PageTitle } from '@shared/ui';

export function WorkspaceMyPagePage() {
    const t = useTranslations('myPage');
    return (
        <main className="p-8">
            <PageTitle title={t('title')} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
                <UserProfile />
                <div className="min-w-0 space-y-6">
                    <AccountInfo />
                    <JoinedWorkspaces />
                </div>
            </div>
        </main>
    );
}
