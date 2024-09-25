import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from "../auth/auth.config";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any = null;

  constructor(
    private oauthService: OAuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidIdToken()) {
        this.userData = this.oauthService.getIdentityClaims();

        // Retrieve the ID token instead of the access token
        const idToken = this.oauthService.getIdToken();

        // Store the ID token
        this.userService.storeToken(idToken);

        // Proceed with account creation or navigation
        this.userService.createAccount(this.userData).subscribe(
          response => {
            this.router.navigate(['/menu']);
          },
          error => {
            console.error('Error creating account:', error);
          }
        );
      }
    });
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  get userName(): string | null {
    return this.userData ? this.userData['name'] : null;
  }
}

