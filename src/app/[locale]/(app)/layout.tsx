import { AppHeader } from '@widgets/app-header';
import { AuthGate } from '@features/auth';
import { MeUserPrefetch } from '@features/me-user-prefetch';
import { NotificationRealtimeSubscriber } from '@entities/notification';

import { WebSocketProvider } from '@/app/providers';

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <AuthGate mode="protected">
            <WebSocketProvider>
                <NotificationRealtimeSubscriber />
                <MeUserPrefetch />
                <div className="flex h-dvh flex-col overflow-hidden">
                    <AppHeader />
                    <div className="flex min-h-0 flex-1 flex-col">{children}</div>
                </div>
            </WebSocketProvider>
        </AuthGate>
    );
}
