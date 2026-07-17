'use client';

import { ErrorPage } from '@views/error-page';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function WorkspaceError({ error, reset }: Props) {
    return <ErrorPage error={error} reset={reset} scope="workspace" />;
}
