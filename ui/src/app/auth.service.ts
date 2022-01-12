import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AccessToken, TokenState } from './ngrx/types';
import { defaultTokenState } from './ngrx/store/app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private stateKey: string = "state"
  private tokenStateKey: string = "tokenState"

  constructor(private _http: HttpClient, private _store: Store) {}

  createState() {
    const buffer = new Uint8Array(40);
    crypto.getRandomValues(buffer);
    const bytes = Array.from(buffer).slice(0,8);
    const encoded = btoa(bytes.toString());
    
    localStorage.setItem(this.stateKey, encoded);

    return encoded;
  }

  getState() {
    return localStorage.getItem(this.stateKey);
  }

  getTokenState(): TokenState {
    if(localStorage.getItem(this.tokenStateKey)) {
      const state = JSON.parse(localStorage.getItem(this.tokenStateKey) as string) as AccessToken;
      return {
        accessToken: state.access_token,
        tokenType: state.token_type,
        expiration: state.expires_in,
        membershipId: state.membership_id,
      };
    } else {
      return defaultTokenState
    }
  }

  requestToken(code: string){
    return this._http.get<AccessToken>(`/token/${code}`).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenStateKey, JSON.stringify(res));
      })
    )
  }
}
