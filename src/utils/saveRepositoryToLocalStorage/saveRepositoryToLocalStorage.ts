import { Issue } from "../../types/issue";
import { RepositoryInfo } from "../../types/repositoryInfo";

export const saveRepositoryToLocalStorage = (
    issues: Issue[],
    repositoryInfo: RepositoryInfo | null
): void => {
    if (repositoryInfo) {
        localStorage.setItem(
            repositoryInfo.html_url,
            JSON.stringify({ issues, repositoryInfo })
        );
    }
};
