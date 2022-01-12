import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { filter, first, Observable, tap, map } from "rxjs";
import { Store, select } from "@ngrx/store";
import { isCharacterDataLoaded } from "./ngrx/selectors/home.selectors";
import { AppState } from "../ngrx/types";
import { getDestinyId } from "./ngrx/actions/home.actions";

@Injectable()
export class HomeResolver implements Resolve<boolean> {
    constructor(private _store: Store<AppState>) {}

    resolve(): Observable<boolean> {
        return this._store.pipe(
            select(isCharacterDataLoaded),
            tap((loaded) => {
                if(!loaded){
                    this._store.dispatch(getDestinyId())
                }
            }),
            filter(loaded => loaded),
            first()
        )
    }
}