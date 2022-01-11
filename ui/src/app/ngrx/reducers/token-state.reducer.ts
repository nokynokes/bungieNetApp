import { createReducer, on  } from "@ngrx/store";
import { defaultTokenState } from "../store/app.store";
import { saveToken } from "../actions/app.actions";

export const tokenStateReducer = createReducer(
    defaultTokenState,
    on(saveToken, (state, payload) => {
        return {
            accessToken: payload.accessToken,
            expiration: payload.expiration,
            tokenType: payload.tokenType,
            membershipId: payload.membershipId,
        }
    })
)