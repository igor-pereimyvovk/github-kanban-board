import { getRepositoryInfo } from "./getRepositoryInfo";

describe("getRepositoryInfo Testing", () => {
    it("Valid workflow", () => {
        const url = "https://github.com/username/repository";
        const repositoryInfo = getRepositoryInfo(url);
        expect(repositoryInfo).toEqual(["username", "repository"]);
    });
});
