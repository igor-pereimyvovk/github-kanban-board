import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import RepositoryForm from "./RepositoryForm";
import { renderWithProviders } from "../../app/redux-test";

describe("RepositoryForm", () => {
    it("Correct interface display", async () => {
        renderWithProviders(<RepositoryForm />);

        const form = screen.getByRole("form");
        const input: HTMLInputElement =
            screen.getByPlaceholderText(/enter repo url/i);
        const button = screen.getByRole("button");

        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        fireEvent.change(input, {
            target: { value: "https://github.com/octocat/Spoon-Knife" },
        });

        expect(input.value).toBe("https://github.com/octocat/Spoon-Knife");
    });

    it("Error message after button clicked with wrong GitHub url", async () => {
        const { getByTestId } = renderWithProviders(<RepositoryForm />);

        const form = screen.getByRole("form");
        const input: HTMLInputElement =
            screen.getByPlaceholderText(/enter repo url/i);
        const button = screen.getByRole("button");

        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(getByTestId("errorElement")).toBeInTheDocument();
    });
});
