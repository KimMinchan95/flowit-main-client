'use client';

import { ErrorPage } from '@views/error-page';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
    return <ErrorPage error={error} reset={reset} scope="global" />;
}
