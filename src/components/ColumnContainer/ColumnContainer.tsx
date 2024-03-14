import { SortableContext } from "@dnd-kit/sortable";
import IssueCard from "../IssueCard/IssueCard";
import styles from "./ColumnContainer.module.css";
import { useMemo } from "react";
import { Issue } from "../../types/issue";
import { useDroppable } from "@dnd-kit/core";

type ColumnContainerProps = {
    containerId: string;
    columnTitle: string;
    issues: Issue[];
};

const ColumnContainer: React.FC<ColumnContainerProps> = ({
    containerId,
    columnTitle,
    issues,
}) => {
    const { setNodeRef } = useDroppable({ id: containerId });

    const issuesIds = useMemo(() => issues.map((issue) => issue.id), [issues]);

    return (
        <section className={styles.column}>
            <h3 className={styles.columnTitle}>{columnTitle}</h3>
            <SortableContext id={containerId} items={issuesIds}>
                <div
                    ref={setNodeRef}
                    className={styles.issues}
                    data-testid={containerId}
                >
                    {issues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                    ))}
                </div>
            </SortableContext>
        </section>
    );
};

export default ColumnContainer;
