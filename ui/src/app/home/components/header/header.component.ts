import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/ngrx/types';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs';
import { getBungieDisplayName, getTotalTimePlayed, getDestinyIcon } from '../../ngrx/selectors/home.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  displayName: string = "";
  totalTimePlayed: string = "";
  iconUrl: string = "";
  private alive: boolean = true;
  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.pipe(
      takeWhile(() => this.alive),
      select(getBungieDisplayName)
    ).subscribe((name) => {
      this.displayName = name;
    });

    this._store.pipe(
      takeWhile(() => this.alive),
      select(getTotalTimePlayed),
    ).subscribe((time) => {
      this.totalTimePlayed = time;
    });

    this._store.pipe(
      takeWhile(() => this.alive),
      select(getDestinyIcon),
    ).subscribe((icon) => {
      this.iconUrl = icon;
    })
  }

  ngOnDestroy(): void {
      this.alive = false;
  }

}
