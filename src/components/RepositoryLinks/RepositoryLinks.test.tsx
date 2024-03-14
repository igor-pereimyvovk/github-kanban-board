import React from "react";
import { renderWithProviders } from "../../app/redux-test";
import RepositoryLinks from "./RepositoryLinks";

describe("RepositoryInfo", () => {
    it("Correct interface display with data", async () => {
        const initialState = {
            issues: [],
            isLoading: false,
            error: { status: false, message: null },
            repositoryInfo: {
                stargazers_count: 1,
                html_url: "repository_url_test",
                name: "repository-test",
                owner: { html_url: "owner_url_test", login: "owner-test" },
            },
        };

        const { getByRole, queryByText } = renderWithProviders(
            <RepositoryLinks />,
            {
                preloadedState: {
                    repository: initialState,
                },
            }
        );

        const displayInfoDiv = getByRole("display-info");
        const instructionP = queryByText(
            /load the repository for information/i
        );

        expect(displayInfoDiv).toBeInTheDocument();
        expect(instructionP).not.toBeInTheDocument();
    });
});
