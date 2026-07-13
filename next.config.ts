import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'http://localhost:8080';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    experimental: {
        authInterrupts: true,
    },
    async rewrites() {
        return [
            {
                source: '/v1/:path*',
                destination: `${apiProxyTarget}/v1/:path*`,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
