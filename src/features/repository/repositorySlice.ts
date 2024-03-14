import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

import { RepositoryInfo } from "../../types/repositoryInfo";
import { Issue } from "../../types/issue";

import axios from "axios";
import { addStateField } from "../../utils/addStateField/addStateField";
import { arrayMove } from "@dnd-kit/sortable";
import { saveRepositoryToLocalStorage } from "../../utils/saveRepositoryToLocalStorage/saveRepositoryToLocalStorage";
import { RepositoryError } from "../../types/repositoryError";

export type RepositoryState = {
    issues: Issue[];
    isLoading: boolean;
    error: RepositoryError;
    repositoryInfo: RepositoryInfo | null;
};

const initialState: RepositoryState = {
    issues: [],
    isLoading: false,
    error: { status: false, message: null },
    repositoryInfo: null,
};

const BASE_URL = "https://api.github.com/repos";

export const fetchRepository = createAsyncThunk(
    "repository/fetchRepository",
    async (ownerAndRepo: { owner: string; repo: string }) => {
        try {
            const { data: issuesData } = await axios.get<Issue[]>(
                `${BASE_URL}/${ownerAndRepo.owner}/${ownerAndRepo.repo}/issues?per_page=12`
            );
            const { data: repositoryInfoData } =
                await axios.get<RepositoryInfo>(
                    `${BASE_URL}/${ownerAndRepo.owner}/${ownerAndRepo.repo}`
                );

            const completeIssuesData = addStateField(issuesData);

            saveRepositoryToLocalStorage(
                completeIssuesData,
                repositoryInfoData
            );

            return { completeIssuesData, repositoryInfoData };
        } catch (error) {
            throw error;
        }
    }
);

const repositorySlice = createSlice({
    name: "repository",
    initialState,
    reducers: {
        setIssuesFromLocaleStorage: (state, action) => {
            const { issues, repositoryInfo } = JSON.parse(action.payload) as {
                issues: Issue[];
                repositoryInfo: RepositoryInfo;
            };
            state.issues = issues;
            state.repositoryInfo = repositoryInfo;
        },
        setErrorStatusToFalse: (state) => {
            state.error.status = false;
            state.error.message = null;
        },
        setErrorStatusToTrue: (state, action) => {
            state.error.status = true;
            state.error.message = action.payload;
        },
        changeIssueColumn: (
            state,
            action: PayloadAction<{
                activeId: number;
                targetContainer: "toDo" | "inProgress" | "done";
            }>
        ) => {
            const { activeId, targetContainer } = action.payload;

            const activeIndex = state.issues.findIndex(
                (issue) => issue.id === activeId
            )!;
            const activeIssue = state.issues[activeIndex];
            activeIssue.state = targetContainer;

            const reversedIssuesArray = [...state.issues].reverse();
            const lastIssueInTargetContainer = reversedIssuesArray.find(
                (issue) => issue.state === targetContainer
            ) as Issue;
            const lastIndexInTargetContainer = state.issues.findIndex(
                (issue) => issue.id === lastIssueInTargetContainer.id
            );

            // Add to new container if it is not empty
            if (lastIndexInTargetContainer !== -1) {
                state.issues.splice(activeIndex, 1);
                state.issues.splice(
                    lastIndexInTargetContainer + 1,
                    0,
                    activeIssue
                );
            }
        },
        changeIssuesOrder: (
            state,
            action: PayloadAction<{ activeId: number; overId: number }>
        ) => {
            const { activeId, overId } = action.payload;

            const activeIndex = state.issues.findIndex(
                (issue) => issue.id === activeId
            );
            let overIndex = state.issues.findIndex(
                (issue) => issue.id === overId
            );

            // Interaction with element in another container
            if (
                state.issues[activeIndex].state !==
                state.issues[overIndex].state
            ) {
                // Save active issue before removing from initial container & change state to target container
                const activeItem = state.issues.find(
                    (issue) => issue.id === activeId
                ) as Issue;
                activeItem.state = state.issues[overIndex].state;
                state.issues.splice(activeIndex, 1);

                // Get actual index of over issue & change order of issues
                overIndex = state.issues.findIndex(
                    (issue) => issue.id === overId
                );
                state.issues.splice(overIndex, 0, activeItem);
                return;
            }

            // Interaction with element in the same container
            state.issues = arrayMove(state.issues, activeIndex, overIndex);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRepository.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRepository.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = { status: false, message: null };
                state.issues = action.payload.completeIssuesData;
                state.repositoryInfo = action.payload.repositoryInfoData;
            })
            .addCase(fetchRepository.rejected, (state) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = "Private or non-existing repository";
            });
    },
});

export const {
    setErrorStatusToFalse,
    setErrorStatusToTrue,
    changeIssuesOrder,
    changeIssueColumn,
    setIssuesFromLocaleStorage,
} = repositorySlice.actions;

export const selectIssuesError = (state: RootState) => state.repository.error;
export const selectIsLoading = (state: RootState) => state.repository.isLoading;
export const selectIssues = (state: RootState) => state.repository.issues;
export const selectRepositoryInfo = (state: RootState) =>
    state.repository.repositoryInfo;

export default repositorySlice.reducer;
