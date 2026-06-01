import { AuthGuard } from '@/app/providers/auth-guard';

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <AuthGuard>{children}</AuthGuard>;
}
