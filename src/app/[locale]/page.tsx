import { AuthGate } from '@features/auth';

export default function HomePage() {
    return <AuthGate mode="redirect" />;
}
