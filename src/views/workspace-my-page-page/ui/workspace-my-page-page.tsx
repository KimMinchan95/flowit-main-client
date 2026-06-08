import { UserProfile } from './user-profile';
import { useTranslations } from 'next-intl';

import { Card } from '@shared/ui';

export function WorkspaceMyPagePage() {
    const t = useTranslations('myPage');
    return (
        <main className="p-8">
            <h1 className="mb-8 text-2xl font-bold tracking-tight text-slate-900">{t('title')}</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
                <Card className="flex flex-col items-center justify-center">
                    <UserProfile />
                </Card>
                <div className="space-y-6">
                    <Card>2</Card>
                    <Card>3</Card>
                </div>
            </div>
        </main>
    );
}
