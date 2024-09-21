import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DungeonAccessGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const selectedCharacter = this.userService.getSelectedCharacter();

    // Check if the character exists and is in a dungeon
    if (selectedCharacter && selectedCharacter.locationId !== 0) {
      return true;
    } else {
      // If the character is not in a dungeon, redirect to the town
      this.router.navigate(['/town']);
      return false;
    }
  }
}
