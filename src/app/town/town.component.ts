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
  characterWorn: any;  // Store the character's worn equipment

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.selectedCharacter = this.userService.getSelectedCharacter();

    // Call backend to ensure character is in town (locationId = 0)
    this.userService.getCharacterLocation(this.selectedCharacter.id).subscribe(
      (locationData) => {
        if (locationData.locationId !== 0) {
          this.router.navigate(['/game']);
        } else {
          // Load the character's guilds and worn equipment
          this.loadCharacterGuilds();
          this.loadCharacterWorn();
        }
      },
      (error) => {
        console.error('Error verifying character location', error);
        this.router.navigate(['/menu']);
      }
    );
  }

  // Load the character's guilds
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

  // Load the character's worn equipment
  loadCharacterWorn(): void {
    this.userService.getAllCharacterWorn(this.selectedCharacter.id).subscribe(
      (wornData) => {
        this.characterWorn = wornData;  // Store the character's worn equipment
      },
      (error) => {
        console.error('Error fetching worn equipment', error);
      }
    );
  }

  goToShop(): void {
    this.router.navigate(['/shop']);
  }
}
