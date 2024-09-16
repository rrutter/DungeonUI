import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  userData: any = null;

  constructor(
    private oauthService: OAuthService,
    private userService: UserService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.userData = this.userService.getUserData();
    console.log('Main menu loaded', this.userData);
  }

  logout() {
    this.userService.clearUserData();
    this.oauthService.logOut();
    this.router.navigate(['login']);
  }

  // Navigate to Character Creation
  navigateToCreateCharacter(): void {
    this.router.navigate(['/create-character']);  // Navigate to the character creation route
  }


  // Getter to retrieve the user's name
  get userName(): string | null {
    return this.userData ? this.userData['name'] : null;  // Use userData to get the name
  }
}
