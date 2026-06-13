type PageTitleProps = {
    title: string;
    subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
    return (
        <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>}
        </div>
    );
}
