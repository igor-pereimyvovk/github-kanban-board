import { useSortable } from "@dnd-kit/sortable";
import { Issue } from "../../types/issue";
import { formatDateToNow } from "../../utils/formatDateToNow/formatDateToNow";
import { CSS } from "@dnd-kit/utilities";

import styles from "./IssueCard.module.css";

type IssueCardProps = {
    issue: Issue;
};

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
    const {
        setNodeRef,
        transform,
        transition,
        attributes,
        listeners,
        isDragging,
    } = useSortable({
        id: issue.id,
        data: {
            type: "Issue",
            issue,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <article
                ref={setNodeRef}
                style={style}
                className={styles.draggingIssue}
            />
        );
    }

    return (
        <article
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={styles.issueCard}
            style={style}
        >
            <h5 className={styles.title}>{issue.title}</h5>
            {issue.body && <p className={styles.body}>{issue.body}</p>}
            <div className={styles.info}>
                {issue.closed_at ? (
                    <span className={styles.infoElement}>
                        {`closed ${formatDateToNow(issue.closed_at)}`}
                    </span>
                ) : (
                    <span className={styles.infoElement}>
                        {`opened ${formatDateToNow(issue.created_at)}`}
                    </span>
                )}

                <span className={styles.infoElement}>{issue.user.login}</span>
                <span
                    className={styles.infoElement}
                >{`${issue.comments} comments`}</span>
            </div>
        </article>
    );
};

export default IssueCard;
