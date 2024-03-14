import { Issue } from "../../types/issue";

export const addStateField = (issuesArray: Issue[]): Issue[] => {
    const issuesArrayCopy: Issue[] = JSON.parse(JSON.stringify(issuesArray));
    return issuesArrayCopy.map((issue) => {
        issue.state = issue.closed_at ? "done" : "toDo";
        return issue;
    });
};
