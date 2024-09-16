import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent implements OnInit {
  characterName: string = '';
  selectedRace: string = 'Human';
  selectedGender: string = 'Male';
  selectedAlignment: string = 'Neutral';
  defaultGuild: string = 'Adventurers Guild';

  races = [
    { name: 'Human', baseStats: { strength: 10, dexterity: 10, constitution: 10, charisma: 10, intelligence: 10, wisdom: 10 }},
    { name: 'Elf', baseStats: { strength: 8, dexterity: 12, constitution: 8, charisma: 10, intelligence: 12, wisdom: 10 }},
    { name: 'Dwarf', baseStats: { strength: 12, dexterity: 8, constitution: 12, charisma: 8, intelligence: 10, wisdom: 10 }}
  ];

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
    // Set default race to Human initially
    this.selectedRace = 'Human';
    this.updateStatsBasedOnRace(this.races[0]);
  }

  // Handle race change and reset stats
  onRaceChange(event: any) {
    const selectedRace = this.races.find(race => race.name === event.target.value);
    if (selectedRace) {
      this.updateStatsBasedOnRace(selectedRace);
    }
  }

  // Reset stats based on selected race and recalculate remaining points
  updateStatsBasedOnRace(race: any) {
    this.stats.forEach(stat => {
      stat.value = race.baseStats[stat.name.toLowerCase()];
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

    const characterData = {
      name: this.characterName,
      race: this.selectedRace,
      gender: this.selectedGender,
      alignment: this.selectedAlignment,
      stats: this.stats.map(stat => ({ [stat.name.toLowerCase()]: stat.value })),
      guild: this.defaultGuild
    };

    // Call the backend to save the character
    this.userService.createCharacter(characterData).subscribe(
      response => {
        console.log('Character created successfully!', response);
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
