import {Component, OnInit} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {CustomDateTimeProvider} from "../auth/auth.datetime";
import {authConfig} from "../auth/auth.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
    const testDateTimeProvider = new CustomDateTimeProvider();
    const testTime = testDateTimeProvider.now();
    console.log('Test Time from CustomDateTimeProvider:', testTime);

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : null;
  }
}
