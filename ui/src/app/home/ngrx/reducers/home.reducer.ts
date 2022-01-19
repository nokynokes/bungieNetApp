import { createReducer, on  } from "@ngrx/store";
import { getDestinyIdSuccess } from "../actions/home.actions";
import { defaultHomeState } from "../store/home.store";

export const homeReducer = createReducer(
    defaultHomeState,
    on(getDestinyIdSuccess, (state, payload) => {
        return { ...state,
            destinyMembership: payload.destinyMembership,
            characters: payload.characters,
        }
    })
)