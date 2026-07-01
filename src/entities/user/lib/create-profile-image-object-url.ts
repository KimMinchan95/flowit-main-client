export function createProfileImageObjectUrl(blob?: Blob) {
    if (!blob) {
        return null;
    }

    return URL.createObjectURL(blob);
}
