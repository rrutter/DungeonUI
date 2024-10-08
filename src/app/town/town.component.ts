import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {CharacterService} from "../services/character.service";

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.css']
})
export class TownComponent implements OnInit {
  selectedCharacter: any;
  characterGuilds: any[] = [];  // Store the character's guilds
  characterWorn: any;  // Store the character's worn equipment

  constructor(
    private userService: UserService,
    private characterService: CharacterService,
    private router: Router) {}

  ngOnInit(): void {
    this.selectedCharacter = this.characterService.getSelectedCharacter();

    // Call backend to ensure character is in town (locationId = 0)
    this.characterService.getCharacterLocation(this.selectedCharacter.id).subscribe(
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

  loadCharacterGuilds(): void {
    this.characterService.getCharacterGuilds(this.selectedCharacter.id).subscribe(
      (guilds) => {
        this.characterGuilds = guilds;
      },
      (error) => {
        console.error('Error fetching guilds', error);
      }
    );
  }

  loadCharacterWorn(): void {
    this.characterService.getAllCharacterWorn().subscribe(
      (wornData) => {
        this.characterWorn = wornData;
      },
      (error) => {
        console.error('Error fetching worn equipment', error);
      }
    );
  }

  goToShop(): void {
    this.router.navigate(['/shop']);
  }

  goToGuilds(): void {
    this.router.navigate(['/guilds']);
  }

  goToBank(): void {
    this.router.navigate(['/bank']);
  }

  goToCharacter(): void {
    this.router.navigate(['/character']);
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }

  goToDungeonList(): void {
    this.router.navigate(['/dungeon-list']);
  }


}
