import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store"
import { takeWhile } from 'rxjs';
import { getAccessTokenState } from '../ngrx/selectors/app.selectors';
import { AppState } from '../ngrx/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  public token: string = "";

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.pipe(
      takeWhile(() => this.alive),
      select(getAccessTokenState)
    ).subscribe((tokenState) => {
      this.token = tokenState.accessToken;
    })
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
