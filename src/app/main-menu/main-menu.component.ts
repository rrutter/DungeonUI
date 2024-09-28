import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {CharacterService} from "../services/character.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  userData: any = null;
  characters: any[] = [];

  constructor(
    private oauthService: OAuthService,
    private userService: UserService,
    private characterService: CharacterService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.userData = this.userService.getUserData();
    if (this.userData && this.userData.id) {
      // Fetch user's characters
      this.characterService.getUserCharacters().subscribe(
        (characters: any[]) => {
          this.characters = characters;
          console.log('User characters:', this.characters);
        },
        error => {
          console.error('Error fetching characters:', error);
        }
      );
    }
  }

  logout() {
    this.userService.clearUserData();
    this.oauthService.logOut();
    this.router.navigate(['login']);
  }

  // Navigate to Character Creation
  navigateToCreateCharacter(): void {
    this.router.navigate(['/create-character']);
  }

  selectCharacter(character: any) {
    this.characterService.setSelectedCharacter(character);
    this.router.navigate(['/game']);
  }


  // Getter to retrieve the user's name
  get userName(): string | null {
    return this.userData ? this.userData['name'] : null;
  }

}
