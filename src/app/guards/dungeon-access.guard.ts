import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CharacterService} from "../services/character.service";

@Injectable({
  providedIn: 'root'
})
export class DungeonAccessGuard implements CanActivate {

  constructor(private characterService: CharacterService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const selectedCharacter = this.characterService.getSelectedCharacter();
    if (!selectedCharacter) {
      this.router.navigate(['/menu']);
      return false;
    }

    // Check if the character is in a dungeon (locationId != 0)
    return this.characterService.getCharacterLocation(selectedCharacter.id).pipe(
      map((locationData: any) => {
        if (locationData.locationId !== 0) {
          return true;  // Character is in a dungeon
        } else {
          // Redirect to the town if the character is not in a dungeon
          this.router.navigate(['/town']);
          return false;
        }
      })
    );
  }
}
