import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomDateTimeProvider} from "./auth/auth.datetime";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule],  // Import OAuthModule here
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = "Dungeon UI";

  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
    const testDateTimeProvider = new CustomDateTimeProvider();
    const testTime = testDateTimeProvider.now();
    console.log('Test Time from CustomDateTimeProvider:', testTime);

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    // Initiates the login flow
    this.oauthService.initImplicitFlow();
  }

  logout() {
    // Logs out the user
    this.oauthService.logOut();
  }

  get userName(): string | null {
    // Retrieves the user's name
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : null;
  }
}
