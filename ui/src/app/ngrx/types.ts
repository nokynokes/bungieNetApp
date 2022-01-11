import { Params } from "@angular/router";
import { RouterReducerState } from "@ngrx/router-store";


export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export interface TokenState {
    accessToken: string;
    expiration: number;
    tokenType: string;
    membershipId: string;
}

export interface AppState {
    router: RouterReducerState<RouterStateUrl>;
    tokenState: TokenState;
}

export interface AccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    membership_id: string;
}