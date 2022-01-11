import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { requestToken, saveToken } from "../actions/app.actions";

@Injectable({providedIn: "root"})
export class AppEffects {

    $requestToken = createEffect(() => {
        return this._actions.pipe(
            ofType(requestToken),
            mergeMap(({ code }) => {
                return this._authService.requestToken(code).pipe(
                    map((res) => {
                        return saveToken({
                            accessToken: res.access_token,
                            membershipId: res.membership_id,
                            tokenType: res.token_type,
                            expiration: res.expires_in
                        })
                    })
                )
            })
        )
    })

    constructor(private _actions: Actions, private _authService: AuthService) {}
}