import { formatDateToNow } from "./formatDateToNow";

describe("formatDateToNow", () => {
    it("", () => {
        const fixedDate = "2024-03-10T12:00:00Z";

        const formattedDate = formatDateToNow(fixedDate);

        expect(formattedDate).not.toContain("about");
    });
});
