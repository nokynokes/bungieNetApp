import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AccessToken } from './ngrx/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _store: Store) {}

  createState() {
    const buffer = new Uint8Array(40);
    crypto.getRandomValues(buffer);
    const bytes = Array.from(buffer).slice(0,8);
    const encoded = btoa(bytes.toString());
    
    localStorage.setItem("state", encoded);

    return encoded;
  }

  getState() {
    return localStorage.getItem("state");
  }

  requestToken(code: string): Observable<any>{
    return this._http.get(`/token/${code}`).pipe(
      tap((res: any) => {
        localStorage.setItem("token", res.access_token);
      })
    )
  }
}
