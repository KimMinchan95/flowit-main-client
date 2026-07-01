export function resolveApiResourcePath(url: string): string | null {
    const trimmed = url.trim();

    if (!trimmed) {
        return null;
    }

    if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
        return null;
    }

    if (trimmed.startsWith('/v1/')) {
        return trimmed;
    }

    if (trimmed.startsWith('v1/')) {
        return `/${trimmed}`;
    }

    try {
        const parsed = new URL(trimmed);
        if (parsed.pathname.startsWith('/v1/')) {
            return `${parsed.pathname}${parsed.search}`;
        }
    } catch {
        // relative path
    }

    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
