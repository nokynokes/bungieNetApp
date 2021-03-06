import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/ngrx/types';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs';
import { getCharacterData, getDestinyIcon, getDestinyInfo, getTotalTimePlayed } from '../../ngrx/selectors/home.selectors';
import { Character } from '../../ngrx/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  iconPath: string = "";
  destinyId: string = "";
  characters: Character[] = [];
  private alive: boolean = true;
  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.pipe(
      takeWhile(() => this.alive),
      select(getDestinyInfo),
    ).subscribe((id) => {
      this.destinyId = id;
    });

    this._store.pipe(
      takeWhile(() => this.alive),
      select(getDestinyIcon),
    ).subscribe((icon) => {
      this.iconPath = icon;
    });

    this._store.pipe(
      takeWhile(() => this.alive),
      select(getCharacterData),
    ).subscribe((characters) => {
      this.characters = characters;
    });
  }

  ngOnDestroy(): void {
      this.alive = false;
  }

}
