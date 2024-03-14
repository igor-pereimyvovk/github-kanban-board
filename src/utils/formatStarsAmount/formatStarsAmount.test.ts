import { formatStarsAmount } from "./formatStarsAmount";

describe("formatStartAmount Testing", () => {
    it("Returns formatted string with K", () => {
        let starsAmount = 1500;
        let formatted = formatStarsAmount(starsAmount);
        expect(formatted).toBe("2K");

        starsAmount = 1000;
        formatted = formatStarsAmount(starsAmount);
        expect(formatted).toBe("1K");
    });

    it("Returns formatted string with M", () => {
        let starsAmount = 1000000;
        let formatted = formatStarsAmount(starsAmount);
        expect(formatted).toBe("1M");

        starsAmount = 2356222;
        formatted = formatStarsAmount(starsAmount);
        expect(formatted).toBe("2M");
    });

    it("Returns original number to string", () => {
        let starsAmount = 600;
        let formatted = formatStarsAmount(starsAmount);
        expect(formatted).toBe("600");

        starsAmount = 0;
        formatted = formatStarsAmount(starsAmount);
        expect(formatted).toBe("0");
    });
});
