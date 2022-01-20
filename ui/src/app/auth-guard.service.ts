import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AppState } from './ngrx/types';
import { Store, select } from "@ngrx/store"
import { getAccessTokenState } from './ngrx/selectors/app.selectors';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private isAuthenticated: Observable<boolean>

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.isAuthenticated = this._store.pipe(
      select(getAccessTokenState),
      map(({ accessToken, expiration}) => {
        if(!!accessToken) {
          const today = new Date();
          const expire = new Date(expiration);

          return today <= expire;
        } else {
          return false
        }
      })
    )
  }

  canActivate() {
      return this.isAuthenticated.pipe(
        tap((isAuth) => {
          if(!isAuth) {
            this._router.navigate(["/login"]);
          }
        })
      )
  }
}
