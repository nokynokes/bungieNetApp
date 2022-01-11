import { AppState, TokenState } from "../types";
import { defualtRouterState } from "./router.serializer";

export const defaultTokenState: TokenState = {
    accessToken: "",
    expiration: 0,
    tokenType: "",
    membershipId: "",
}

export const defaultAppState: AppState = {
    router: defualtRouterState,
    tokenState: defaultTokenState, 
}