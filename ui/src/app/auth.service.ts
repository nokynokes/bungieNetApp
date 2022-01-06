import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getState() {
    const buffer = new Uint8Array(40);
    crypto.getRandomValues(buffer);
    const bytes = Array.from(buffer).slice(0,8);
    return btoa(bytes.toString());
  }
}
