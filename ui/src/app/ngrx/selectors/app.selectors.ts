import { createSelector } from "@ngrx/store";
import { AppState } from "../types";

export const getAccessTokenState = createSelector(
    (state: AppState) => state.tokenState,
    (tokenState) => tokenState
);