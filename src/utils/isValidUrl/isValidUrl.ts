export const isValidUrl = (repositoryUrl: string): boolean => {
    // example of regex - https://github.com/{owner}/{repo}
    const githubUrlRegex = /^https:\/\/github\.com\/([^\/\\]+)\/([^\/\\]+)$/;

    return githubUrlRegex.test(repositoryUrl);
};
