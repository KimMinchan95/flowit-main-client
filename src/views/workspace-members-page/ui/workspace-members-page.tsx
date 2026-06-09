import { useTranslations } from 'next-intl';

import { InvitationCodeShare } from '@features/invitation-code-share';

import { PageTitle } from '@shared/ui';

type Props = {
    workspaceId: string;
};

export function WorkspaceMembersPage({ workspaceId }: Props) {
    const t = useTranslations('members');

    return (
        <main className="p-8">
            <PageTitle title={t('title')} subtitle={t('description')} />
            <InvitationCodeShare workspaceId={workspaceId} />
        </main>
    );
}
