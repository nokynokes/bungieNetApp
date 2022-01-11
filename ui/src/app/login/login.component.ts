import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { getQueryParamMap } from '../ngrx/selectors/router.selectors';
import { AppState } from '../ngrx/types';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private oauthURL: string = "https://www.bungie.net/en/oauth/authorize"
  private clientId: string = ""
  constructor(private _authService: AuthService, private _store: Store<AppState>) { }

  ngOnInit(): void {}

  login(): void {
    const state = this._authService.createState();
    let url = this.oauthURL + `?response_type=code&client_id=${this.clientId}&state=${state}`
    window.open(url);
  }
}
