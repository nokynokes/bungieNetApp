import { createAction, props } from "@ngrx/store";

export enum AppActions {
    RequestAccessToken = "[Auth] Request Access Token",
    SaveAccessToken = "[Auth] Save Access Token"
};

export const requestToken = createAction(
    AppActions.RequestAccessToken,
    props<{ code: string}>()
);

export const saveToken = createAction(
    AppActions.SaveAccessToken,
    props<{ accessToken: string, membershipId: string, expiration: number, tokenType: string}>()
);