import { createAction, props } from "@ngrx/store";
import { Character, DestinyMembership } from "../types";

export enum HomeActions {
    GetDestinyId = "[Home] Get Destiny Id",
    GetDestinyIdSuccess = "[Home] Get Destiny Id Success",
}

export const getDestinyId = createAction(
    HomeActions.GetDestinyId
)

export const getDestinyIdSuccess = createAction(
    HomeActions.GetDestinyIdSuccess,
    props<{destinyMembership: DestinyMembership, characters: Character[]}>()
)


