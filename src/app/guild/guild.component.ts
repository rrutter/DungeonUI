import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';  // Assuming service for character actions
import { GuildService } from '../services/guild.service';  // Assuming separate guild service

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  guilds: any[] = [];
  selectedCharacter: any;

  constructor(
    private guildService: GuildService,
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedCharacter = this.characterService.getSelectedCharacter();

    this.guildService.getAllGuilds().subscribe((data: any[]) => {
      this.guilds = data;
    });
  }

  meetsRequirements(guild: any): boolean {
    return (
      this.selectedCharacter.strength >= guild.strengthRequirement &&
      this.selectedCharacter.dexterity >= guild.dexterityRequirement &&
      this.selectedCharacter.constitution >= guild.constitutionRequirement &&
      this.selectedCharacter.charisma >= guild.charismaRequirement &&
      this.selectedCharacter.intelligence >= guild.intelligenceRequirement &&
      this.selectedCharacter.wisdom >= guild.wisdomRequirement
    );
  }

  joinGuild(guild: any): void {
    if (this.meetsRequirements(guild)) {
      this.characterService.joinGuild(this.selectedCharacter.id, guild.id).subscribe(() => {
        alert('You have joined the ' + guild.name + '!');
        this.router.navigate(['/town']);
      });
    }
  }

  goBackToTown(): void {
    this.router.navigate(['/town']);
  }
}
