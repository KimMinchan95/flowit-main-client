import { AuthGate } from '@features/auth';

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <AuthGate mode="protected">{children}</AuthGate>;
}
