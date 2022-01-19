import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, withLatestFrom, Observable, defer } from "rxjs";
import { AppState, TokenState } from "src/app/ngrx/types";
import { HomeService } from "../../home.service";
import { getDestinyId, getDestinyIdSuccess } from "../actions/home.actions";
import { getAccessTokenState } from "src/app/ngrx/selectors/app.selectors";
import { Character, DestinyMembership } from "../types";

@Injectable({providedIn: "root"})
export class HomeEffects {

    $getDestinyId = createEffect(() => {
        return this._actions.pipe(
            ofType(getDestinyId),
            withLatestFrom(defer(() => this.selectTokenState)),
            mergeMap(([_, state]) => {
                return this._homeService.getDestinyMembershipId(state.membershipId).pipe(
                    map((res) => {
                        return getDestinyIdSuccess({
                            destinyMembership: res.destinyMembership as DestinyMembership,
                            characters: res.characters as Character[],
                        })
                    })
                )
            })
        )
    })

    private selectTokenState: Observable<TokenState>;
    constructor(private _actions: Actions, private _homeService: HomeService, private _store: Store<AppState>) {
        this.selectTokenState = this._store.select(getAccessTokenState);
    }
}