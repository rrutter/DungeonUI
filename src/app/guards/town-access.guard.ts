import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TownGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const selectedCharacter = this.userService.getSelectedCharacter();
    if (!selectedCharacter) {
      this.router.navigate(['/menu']);
      return false;
    }

    // Check if the character is in town (locationId == 0)
    return this.userService.getCharacterLocation(selectedCharacter.id).pipe(
      map((locationData: any) => {
        if (locationData.locationId === 0) {
          return true;
        } else {
          // Redirect if the character is not in town
          this.router.navigate(['/game']);
          return false;
        }
      })
    );
  }
}
