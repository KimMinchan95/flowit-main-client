import { AuthGate } from '@features/auth';

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <AuthGate mode="guest">{children}</AuthGate>;
}
