import { isValidUrl } from "./isValidUrl";

describe("IsValidUrl Testing", () => {
    it("Valid GitHub repository URL", () => {
        const url = "https://github.com/username/repository";
        expect(isValidUrl(url)).toBeTruthy();
    });

    it("Invalid GitHub repository URL (without https://)", () => {
        const url = "github.com/username/repository";
        expect(isValidUrl(url)).toBeFalsy();
    });

    it("Invalid GitHub repository URL (without github.com)", () => {
        const url = "https:///username/repository";
        expect(isValidUrl(url)).toBeFalsy();
    });

    it("Invalid GitHub repository URL (without username)", () => {
        const url = "https://github.com//repository";
        expect(isValidUrl(url)).toBeFalsy();
    });

    it("Invalid GitHub repository URL (without repository)", () => {
        const url = "https://github.com/username/";
        expect(isValidUrl(url)).toBeFalsy();
    });

    it("Invalid GitHub repository URL (without '/')", () => {
        const url = "https://github.comusernamerepository";
        expect(isValidUrl(url)).toBeFalsy();
    });
});
