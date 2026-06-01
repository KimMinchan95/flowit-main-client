import { GuestGuard } from '@features/auth';

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <GuestGuard>{children}</GuestGuard>;
}
