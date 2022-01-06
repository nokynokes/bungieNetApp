import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private oauthURL: string = "https://www.bungie.net/en/oauth/authorize"
  private clientId: string = "38809"
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  
  }

  login(): void {
    const state = this._authService.getState();
    let url = this.oauthURL + `?response_type=code&client_id=${this.clientId}&state=${state}`
    window.open(url);
  }
}
