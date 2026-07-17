import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@shared/ui/card';
import { cn } from '@shared/lib';

import type { ReactNode } from 'react';

type StatusPageProps = {
    statusCode: string;
    logoAlt: string;
    title: string;
    description: string;
    goHomeLabel?: string;
    homeHref?: string;
    actions?: ReactNode;
};

export function StatusPage({
    statusCode,
    logoAlt,
    title,
    description,
    goHomeLabel,
    homeHref,
    actions,
}: StatusPageProps) {
    return (
        <div className="relative flex min-h-dvh flex-col items-center justify-center px-4">
            <div className="absolute top-[100px] left-[100px] h-[350px] w-[350px] rounded-full bg-indigo-300/30 mix-blend-multiply blur-[80px]" />

            <Card className="flex w-full max-w-md flex-col items-center px-8 py-10">
                <Image
                    className="mb-6 h-auto w-28"
                    src="/images/flowit-logo.png"
                    width={100}
                    height={100}
                    alt={logoAlt}
                    priority
                />
                <p className="mb-2 text-6xl font-bold text-blue-600">{statusCode}</p>
                <h1 className="mb-2 text-center text-xl font-bold text-slate-900">{title}</h1>
                <p className="mb-8 text-center text-sm font-semibold text-slate-500">{description}</p>
                {actions ??
                    (goHomeLabel && homeHref ? (
                        <Link
                            href={homeHref}
                            className={cn(
                                'inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold shadow-sm transition-all',
                                'bg-blue-600 text-white hover:bg-blue-700',
                            )}
                        >
                            {goHomeLabel}
                        </Link>
                    ) : null)}
            </Card>
        </div>
    );
}
