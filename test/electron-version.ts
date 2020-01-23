export function electronVersion() {
    return process && process.versions && (process.versions as any).electron;
}

export function versionNo(version: string) {
    return (
        (version && Number((/(\d+)\.\d+\.\d+(?:.*)/.exec(version) || [])[1])) || NaN
    );
}
