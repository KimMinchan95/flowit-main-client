import type { Components } from 'react-markdown';

export const markdownPreviewComponents: Components = {
    h1: ({ children }) => <h1 className="m-0 text-base font-bold text-slate-900">{children}</h1>,
    h2: ({ children }) => <h2 className="m-0 text-[15px] font-bold text-slate-900">{children}</h2>,
    h3: ({ children }) => <h3 className="m-0 text-sm font-bold text-slate-900">{children}</h3>,
    h4: ({ children }) => <h4 className="m-0 text-sm font-semibold text-slate-800">{children}</h4>,
    p: ({ children }) => <p className="m-0">{children}</p>,
    ul: ({ children }) => <ul className="m-0 list-disc space-y-0.5 pl-4">{children}</ul>,
    ol: ({ children }) => <ol className="m-0 list-decimal space-y-0.5 pl-4">{children}</ol>,
    li: ({ children }) => <li className="m-0">{children}</li>,
    blockquote: ({ children }) => (
        <blockquote className="m-0 border-l-2 border-slate-200 pl-2.5 text-slate-500">{children}</blockquote>
    ),
    code: ({ className, children }) => {
        const isBlock = className?.includes('language-');

        if (isBlock) {
            return <code className={className}>{children}</code>;
        }

        return <code className="rounded bg-slate-50 px-1.5 py-0.5 text-[0.8125rem] text-rose-700">{children}</code>;
    },
    pre: ({ children }) => (
        <pre className="m-0 overflow-x-auto rounded-lg bg-slate-50 p-2 text-slate-900">{children}</pre>
    ),
    a: ({ children, href }) => (
        <a href={href} className="text-blue-600 underline" target="_blank" rel="noreferrer">
            {children}
        </a>
    ),
    table: ({ children }) => (
        <div className="m-0 overflow-x-auto">
            <table className="w-full border-collapse">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
        <th className="border border-slate-200 bg-slate-50 px-2 py-1.5 text-left font-bold">{children}</th>
    ),
    td: ({ children }) => <td className="border border-slate-200 px-2 py-1.5 text-left">{children}</td>,
    hr: () => <hr className="my-0 border-slate-200" />,
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
};
