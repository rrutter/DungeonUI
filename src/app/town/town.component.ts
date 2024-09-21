import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.css']
})
export class TownComponent implements OnInit {
  selectedCharacter: any;
  characterGuilds: any[] = [];  // Store the character's guilds

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.selectedCharacter = this.userService.getSelectedCharacter();

    // Call backend to ensure character is in town (locationId = 0)
    this.userService.getCharacterLocation(this.selectedCharacter.id).subscribe(
      (locationData) => {
        if (locationData.locationId !== 0) {
          this.router.navigate(['/game']);
        } else {
          // Fetch the character's guilds when they are in town
          this.loadCharacterGuilds();
        }
      },
      (error) => {
        console.error('Error verifying character location', error);
        this.router.navigate(['/menu']);
      }
    );
  }

  loadCharacterGuilds(): void {
    this.userService.getCharacterGuilds(this.selectedCharacter.id).subscribe(
      (guilds) => {
        this.characterGuilds = guilds;  // Store the guilds for display
      },
      (error) => {
        console.error('Error fetching guilds', error);
      }
    );
  }
}

