import Image from 'next/image';

import { WorkspacesHeaderProfileButton } from './workspaces-header-profile-button';
import { Bell } from 'lucide-react';
import FlowitLogo from 'public/images/flowit-logo.png';

import { Button } from '@shared/ui';

export function WorkspacesHeader() {
    return (
        <header className="z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-8">
            <Image src={FlowitLogo} alt="Flowit Logo" width={100} height={100} className="h-auto w-28" />
            <div className="flex items-center gap-3">
                <Button
                    iconOnly
                    icon={<Bell width={22} height={22} />}
                    variant="ghost"
                    rounded="full"
                    className="p-2 text-slate-500 hover:text-slate-700"
                />
                <div className="my-2 self-stretch border-l border-slate-200" />
                <WorkspacesHeaderProfileButton />
            </div>
        </header>
    );
}
