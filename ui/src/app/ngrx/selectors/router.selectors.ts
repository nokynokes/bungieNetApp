import { createSelector } from "@ngrx/store";
import { AppState } from "../types";
import { convertToParamMap } from "@angular/router";

export const getQueryParamMap = createSelector(
    (state: AppState) => state.router,
    (router) => convertToParamMap(router.state.queryParams)
)