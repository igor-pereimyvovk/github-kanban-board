import { useMemo } from "react";
import { Issue } from "../types/issue";

export const useFilteredIssues = (issues: Issue[]): Array<Issue[]> => {
    return useMemo(() => {
        if (issues.length) {
            const toDoIssues = issues.filter((issue) => issue.state === "toDo");
            const inProgressIssues = issues.filter(
                (issue) => issue.state === "inProgress"
            );
            const doneIssues = issues.filter((issue) => issue.state === "done");

            return [toDoIssues, inProgressIssues, doneIssues];
        }

        return [[], [], []];
    }, [issues]);
};
