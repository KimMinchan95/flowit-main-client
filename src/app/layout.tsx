import './globals.css';

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="ko" className="h-full antialiased">
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
