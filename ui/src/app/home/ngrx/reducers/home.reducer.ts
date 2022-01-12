import { createReducer, on  } from "@ngrx/store";
import { getDestinyIdSuccess } from "../actions/home.actions";
import { defaultHomeState } from "../store/home.store";

export const homeReducer = createReducer(
    defaultHomeState,
    on(getDestinyIdSuccess, (state, payload) => {
        console.log(payload.icon);
        return { ...state,
            destinyId: payload.destinyId,
            icon: payload.icon,
            characters: payload.characters,
            totalTimePlayed: payload.totalTimePlayed,
        }
    })
)