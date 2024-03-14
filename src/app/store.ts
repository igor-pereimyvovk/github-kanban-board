import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repositoryReducer from "../features/repository/repositorySlice";

const rootReducer = combineReducers({
    repository: repositoryReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
