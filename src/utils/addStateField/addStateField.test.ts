import { Issue } from "../../types/issue";
import { addStateField } from "./addStateField";

describe("addStateField", () => {
    it("Returns updated issues array with correct state field", () => {
        const oldIssuesArray = [
            {
                id: 1,
                body: "test_body",
                title: "test_title",
                comments: 3,
                user: { login: "test_login" },
                created_at: "2024-03-13T12:00:00Z",
                closed_at: "2024-03-14T12:00:00Z",
            },
            {
                id: 2,
                body: "test_body",
                title: "test_title",
                comments: 1,
                user: { login: "test_login" },
                created_at: "2024-03-13T12:30:00Z",
                closed_at: null,
            },
        ] as Issue[];
        const expectedIssuesArray = [
            {
                id: 1,
                body: "test_body",
                title: "test_title",
                comments: 3,
                user: { login: "test_login" },
                created_at: "2024-03-13T12:00:00Z",
                closed_at: "2024-03-14T12:00:00Z",
                state: "done",
            },
            {
                id: 2,
                body: "test_body",
                title: "test_title",
                comments: 1,
                user: { login: "test_login" },
                created_at: "2024-03-13T12:30:00Z",
                closed_at: null,
                state: "toDo",
            },
        ];

        const updatedIssuesArray = addStateField(oldIssuesArray);

        expect(updatedIssuesArray).toEqual(expectedIssuesArray);
    });
});
