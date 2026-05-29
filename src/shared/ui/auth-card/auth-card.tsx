import Image from 'next/image';

import { Card } from '@shared/ui/card';

import type { ReactNode } from 'react';

type AuthCardProps = {
    logoAlt: string;
    title: string;
    description: string;
    children: ReactNode;
    footer?: ReactNode;
    bottomContent?: ReactNode;
};

export function AuthCard({ logoAlt, title, description, children, footer, bottomContent }: AuthCardProps) {
    return (
        <div className="my-2 flex flex-1 flex-col items-center justify-center">
            <div className="absolute top-[100px] left-[100px] h-[350px] w-[350px] rounded-full bg-indigo-300/30 mix-blend-multiply blur-[80px]" />

            <Card className="flex w-100 flex-col items-center">
                <Image className="mb-5" src="/images/flowit-logo.png" alt={logoAlt} width={100} height={100} />
                <div className="mb-5 flex flex-col gap-2">
                    <h1 className="text-center text-xl font-bold text-slate-900">{title}</h1>
                    <p className="text-center text-sm font-bold text-slate-500">{description}</p>
                </div>
                {children}
                {footer ? <div className="mt-7 flex gap-1">{footer}</div> : null}
            </Card>
            {bottomContent ? <div className="mt-1">{bottomContent}</div> : null}
        </div>
    );
}
