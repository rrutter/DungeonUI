import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Race, Gender, Alignment, BaseStats } from './character-interfaces'

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent implements OnInit {
  characterName: string = '';
  selectedRace: string = '';
  selectedGender: string = '';
  selectedAlignment: string = '';
  defaultGuild: string = 'Adventurers Guild';

  genders: Gender[] = [];
  alignments: Alignment[] = [];
  races: Race[] = [];
  stats = [
    { name: 'Strength', value: 10, min: 0, max: 20 },
    { name: 'Dexterity', value: 10, min: 0, max: 20 },
    { name: 'Constitution', value: 10, min: 0, max: 20 },
    { name: 'Charisma', value: 10, min: 0, max: 20 },
    { name: 'Intelligence', value: 10, min: 0, max: 20 },
    { name: 'Wisdom', value: 10, min: 0, max: 20 }
  ];

  maxPoints: number = 70;
  remainingPoints: number = 10;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Fetch races from backend
    this.userService.getCharacterData().subscribe((data: Race[]) => {
      this.races = data;
      console.log('existing races:', this.races);

      // Set default selected race and update stats when races are loaded
      if (this.races.length > 0) {
        this.selectedRace = this.races[0].name;
        this.updateStatsBasedOnRace(this.races[0]);
      }
    });

    // Fetch genders from backend
    this.userService.getGenders().subscribe((data: Gender[]) => {
      this.genders = data;
      this.selectedGender = this.genders[0]?.name || 'Male'; // Default selection
      console.log('existing genders:', this.genders);
    });

    // Fetch alignments from backend
    this.userService.getAlignments().subscribe((data: Alignment[]) => {
      this.alignments = data;
      this.selectedAlignment = this.alignments[0]?.name || 'Neutral'; // Default selection
      console.log('existing alignments:', this.alignments);
    });
  }

  // Handle race change and reset stats
  onRaceChange(event: any) {
    const selectedRace = this.races.find(race => race.name === event.target.value);
    if (selectedRace) {
      this.updateStatsBasedOnRace(selectedRace);
    }
  }

  // Reset stats based on selected race and recalculate remaining points
  updateStatsBasedOnRace(race: Race) {
    this.stats.forEach(stat => {
      stat.value = race.baseStats[stat.name.toLowerCase() as keyof BaseStats];
    });
    this.calculateRemainingPoints();
  }

  // Recalculate remaining points after stats have been reset or modified
  calculateRemainingPoints() {
    const totalUsedPoints = this.stats.reduce((sum, stat) => sum + stat.value, 0);
    this.remainingPoints = this.maxPoints - totalUsedPoints;
  }

  // Increase a stat if possible (within remaining points)
  increaseStat(stat: any) {
    if (this.remainingPoints > 0 && stat.value < stat.max) {
      stat.value++;
      this.calculateRemainingPoints();
    }
  }

  // Decrease a stat if possible
  decreaseStat(stat: any) {
    if (stat.value > stat.min) {
      stat.value--;
      this.calculateRemainingPoints();
    }
  }

  createCharacter() {
    if (this.remainingPoints < 0) {
      alert("You have exceeded the available points!");
      return;
    }

    // Map the stats array to specific character properties
    const characterData = {
      name: this.characterName,
      race: this.selectedRace,
      gender: this.selectedGender,
      alignment: this.selectedAlignment,
      strength: this.stats.find(stat => stat.name === 'Strength')?.value,
      dexterity: this.stats.find(stat => stat.name === 'Dexterity')?.value,
      constitution: this.stats.find(stat => stat.name === 'Constitution')?.value,
      charisma: this.stats.find(stat => stat.name === 'Charisma')?.value,
      intelligence: this.stats.find(stat => stat.name === 'Intelligence')?.value,
      wisdom: this.stats.find(stat => stat.name === 'Wisdom')?.value,
      guild: this.defaultGuild
    };

    const userId = this.userService.getUserData().id;  // Assuming you store user data on login

    // Call the backend to save the character
    this.userService.createCharacter(characterData, userId).subscribe(
      response => {
        console.log('Character created successfully!!', response);
        this.router.navigate(['/game']);
      },
      error => {
        console.error('Error creating character', error);
      }
    );
  }


  cancel(): void {
    this.router.navigate(['/menu']);  // Navigate back to the main menu
  }
}
