import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectIssues,
    changeIssuesOrder,
    changeIssueColumn,
    selectRepositoryInfo,
} from "../../features/repository/repositorySlice";
import { useFilteredIssues } from "../../hooks/useFilteredIssues";
import {
    DndContext,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import ColumnContainer from "../ColumnContainer/ColumnContainer";
import IssueCard from "../IssueCard/IssueCard";
import { Issue } from "../../types/issue";
import { saveRepositoryToLocalStorage } from "../../utils/saveRepositoryToLocalStorage/saveRepositoryToLocalStorage";
import styles from "./KanbanBoard.module.css";

const KanbanBoard = () => {
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const issues = useAppSelector(selectIssues);
    const repositoryInfo = useAppSelector(selectRepositoryInfo);

    const dispatch = useAppDispatch();

    const [toDoIssues, inProgressIssues, doneIssues] =
        useFilteredIssues(issues);

    useEffect(() => {
        let timeout: number;
        if (repositoryInfo) {
            timeout = window.setTimeout(() => {
                saveRepositoryToLocalStorage(issues, repositoryInfo);
            }, 1500);
        }
        return () => clearTimeout(timeout);
    }, [issues, repositoryInfo]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleCopyButtonClick = () => {
        navigator.clipboard.writeText("https://github.com/octocat/Spoon-Knife");
        setIsCopied(true);
    };

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "Issue") {
            setActiveIssue(event.active.data.current.issue);
        }
    };
    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as number;
        const overId = over.id as number;

        if (activeId === overId) return;

        const isOverContainer = over.data.current ? false : true;

        if (isOverContainer) {
            const initialContainer: string =
                active.data.current?.sortable?.containerId;
            const targetContainer = over.id as "toDo" | "inProgress" | "done";

            if (initialContainer === targetContainer) return;

            dispatch(changeIssueColumn({ activeId, targetContainer }));
        } else {
            dispatch(changeIssuesOrder({ activeId, overId }));
        }
    };
    const onDragEnd = () => {
        setActiveIssue(null);
    };

    return (
        <main className={styles.columnsContainer}>
            {issues.length ? (
                <DndContext
                    sensors={sensors}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragEnd={onDragEnd}
                >
                    <ColumnContainer
                        containerId="toDo"
                        columnTitle="to do"
                        issues={toDoIssues}
                    />
                    <ColumnContainer
                        containerId="inProgress"
                        columnTitle="in progress"
                        issues={inProgressIssues}
                    />
                    <ColumnContainer
                        containerId="done"
                        columnTitle="done"
                        issues={doneIssues}
                    />
                    {createPortal(
                        <DragOverlay>
                            {activeIssue && <IssueCard issue={activeIssue} />}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            ) : (
                <div className={styles.noIssues}>
                    <button
                        onClick={handleCopyButtonClick}
                        className={styles["copyTestLink"]}
                    >
                        {isCopied ? "Copied" : "Click to copy test url"}
                    </button>
                </div>
            )}
        </main>
    );
};

export default KanbanBoard;
