import { createAction, props } from "@ngrx/store";
import { Character } from "../types";

export enum HomeActions {
    GetDestinyId = "[Home] Get Destiny Id",
    GetDestinyIdSuccess = "[Home] Get Destiny Id Success",
}

export const getDestinyId = createAction(
    HomeActions.GetDestinyId
)

export const getDestinyIdSuccess = createAction(
    HomeActions.GetDestinyIdSuccess,
    props<{destinyId: string, icon: string, characters: Character[], totalTimePlayed: string}>()
)


