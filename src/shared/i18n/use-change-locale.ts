'use client';

import { usePathname, useRouter } from './navigation';
import { routing } from './routing';
import { useLocale } from 'next-intl';

import type { Locale } from './routing';

export function useChangeLocale() {
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();

    const changeLocale = (nextLocale: Locale) => {
        if (nextLocale === locale) {
            return;
        }

        router.replace(pathname, { locale: nextLocale });
    };

    const toggleLocale = () => {
        const currentIndex = routing.locales.indexOf(locale);
        const nextLocale = routing.locales[(currentIndex + 1) % routing.locales.length];

        changeLocale(nextLocale);
    };

    return {
        locale,
        changeLocale,
        toggleLocale,
    };
}
