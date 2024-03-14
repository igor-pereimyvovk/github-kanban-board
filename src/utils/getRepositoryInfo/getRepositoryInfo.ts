export const getRepositoryInfo = (repositoryUrl: string): string[] => {
    const url = new URL(repositoryUrl);

    const [owner, repo] = url.pathname.split("/").filter(Boolean);

    return [owner, repo];
};
