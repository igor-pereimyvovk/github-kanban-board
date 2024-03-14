import React from "react";
import { renderWithProviders } from "../../app/redux-test";
import KanbanBoard from "./KanbanBoard";
import { RepositoryState } from "../../features/repository/repositorySlice";

describe("KanbanBoard", () => {
    it("Correct interface display with no issues", () => {
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

        const { getByText } = renderWithProviders(<KanbanBoard />, {
            preloadedState: { repository: initialState },
        });

        const clickToCopyButton = getByText(/click to copy test url/i);

        expect(clickToCopyButton).toBeInTheDocument();
    });

    it("Correct interface display with issues", () => {
        const initialState = {
            issues: [
                {
                    id: 1,
                    body: "test_body",
                    title: "test_title",
                    comments: 0,
                    user: { login: "test_login" },
                    created_at: "2023-03-13T05:44:29Z",
                    closed_at: null,
                    state: "toDo",
                },
                {
                    id: 2,
                    body: "test_body",
                    title: "test_title",
                    comments: 0,
                    user: { login: "test_login" },
                    created_at: "2023-03-13T05:44:29Z",
                    closed_at: null,
                    state: "toDo",
                },
                {
                    id: 3,
                    body: "test_body",
                    title: "test_title",
                    comments: 0,
                    user: { login: "test_login" },
                    created_at: "2023-03-13T05:44:29Z",
                    closed_at: null,
                    state: "toDo",
                },
                {
                    id: 4,
                    body: "test_body",
                    title: "test_title",
                    comments: 0,
                    user: { login: "test_login" },
                    created_at: "2023-03-13T05:44:29Z",
                    closed_at: null,
                    state: "inProgress",
                },
                {
                    id: 5,
                    body: "test_body",
                    title: "test_title",
                    comments: 0,
                    user: { login: "test_login" },
                    created_at: "2023-03-13T05:44:29Z",
                    closed_at: null,
                    state: "done",
                },
                {
                    id: 6,
                    body: "test_body",
                    title: "test_title",
                    comments: 0,
                    user: { login: "test_login" },
                    created_at: "2023-03-13T05:44:29Z",
                    closed_at: null,
                    state: "done",
                },
            ],
            isLoading: false,
            error: { status: false, message: null },
            repositoryInfo: {
                stargazers_count: 1,
                html_url: "repository_url_test",
                name: "repository-test",
                owner: { html_url: "owner_url_test", login: "owner-test" },
            },
        };

        const { queryByText, queryByTestId } = renderWithProviders(
            <KanbanBoard />,
            { preloadedState: { repository: initialState as RepositoryState } }
        );

        const clickToCopyButton = queryByText(/click to copy test url/i);

        const toDoContainer = queryByTestId("toDo");
        const inProgressContainer = queryByTestId("inProgress");
        const doneContainer = queryByTestId("done");

        expect(toDoContainer).toBeInTheDocument();
        expect(clickToCopyButton).not.toBeInTheDocument();

        expect(toDoContainer?.childElementCount).toBe(3);
        expect(inProgressContainer?.childElementCount).toBe(1);
        expect(doneContainer?.childElementCount).toBe(2);
    });
});
