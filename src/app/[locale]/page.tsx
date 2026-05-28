import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('common');

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <h1>{t('Home')}</h1>
        </div>
    );
}
