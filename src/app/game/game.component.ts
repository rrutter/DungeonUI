import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Assuming the selected character is stored in the UserService
    const character = this.userService.getSelectedCharacter();

    if (!character) {
      // If no character is selected, navigate back to the main menu
      this.router.navigate(['/menu']);
      return;
    }

    // Check the locationId and route to the correct component
    if (character.locationId === 0) {
      // Character is in town
      this.router.navigate(['/town']);
    } else {
      // Character is in the dungeon, pass the dungeon level and position
      this.router.navigate(['/dungeon']);
    }
  }
}
