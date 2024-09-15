import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from "../auth/auth.config";
import {UserService} from "../services/user.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any = null;  // Store all user data for testing

  constructor(
    private oauthService: OAuthService,
    private userService: UserService,
    private router: Router)
    {
      // Debugging router navigation events
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
        console.log('NavigationEnd:', event);
      });
  }

  ngOnInit() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
        this.userData = this.oauthService.getIdentityClaims();
        console.log('User Data:', this.userData);

        this.userService.createAccount(this.userData).subscribe(
          response => {
            console.log('Account created successfully:', response);
            // Debugging token validity after creating account
            if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
              console.log('Token is still valid, navigating to menu');
            } else {
              console.log('Token has become invalid after account creation');
            }
            this.router.navigate(['/menu']).then(r => {
              console.log('navigating to menu...', r);
            });
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

  // Getter to retrieve the user's name
  get userName(): string | null {
    return this.userData ? this.userData['name'] : null;  // Use userData to get the name
  }
}
