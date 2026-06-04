import { MeUserPrefetch } from './me-user-prefetch';

import { WorkspacesHeader } from '@widgets/workspaces-page';
import { AuthGate } from '@features/auth';

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <AuthGate mode="protected">
            <MeUserPrefetch />
            <div className="flex h-dvh flex-col overflow-hidden">
                <WorkspacesHeader />
                <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            </div>
        </AuthGate>
    );
}
