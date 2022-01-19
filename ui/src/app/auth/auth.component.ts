import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../ngrx/types';
import { getQueryParamMap } from '../ngrx/selectors/router.selectors';
import { takeWhile } from 'rxjs';
import { requestToken } from '../ngrx/actions/app.actions';
import { getAccessTokenState } from '../ngrx/selectors/app.selectors';
import { Router } from "@angular/router"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private alive: boolean = true;
  constructor(private _authService: AuthService, private _store: Store<AppState>, private _router: Router) { }

  ngOnInit(): void {
    this._store.pipe(
      takeWhile(() => this.alive),
      select(getAccessTokenState)
    ).subscribe((state) => {
      if(!!state.accessToken){
        this._router.navigate(["/home/profile"])
      }
    });

    this._store.pipe(
        takeWhile(() => this.alive), 
        select(getQueryParamMap)
      ).subscribe((queryParams) => {
        if(queryParams.has("code") && queryParams.has("state")){
          const code = queryParams.get("code") as string; // send this to backend for token
          const state = queryParams.get("state") as string; // compare this to state we made 
          const oldState = this._authService.getState();

          if(oldState === state){
            this._store.dispatch(requestToken({ code: code}))
          } else {
            console.error("states dont match!!");
          }
        } else {
          //errorHandle 
        }
    })
  }

  ngOnDestroy(): void {
      this.alive = false;
  }
}
