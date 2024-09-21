import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrl: './dungeon.component.css'
})
export class DungeonComponent implements OnInit {
  private selectedCharacter: any;
  level!: number;
  xPosition!: number;
  yPosition!: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.selectedCharacter = this.userService.getSelectedCharacter();
    this.loadDungeonRoom(this.selectedCharacter.level, this.selectedCharacter.xPosition, this.selectedCharacter.yPosition);
  }

  loadDungeonRoom(level: number, xPosition: number, yPosition: number) {
    // Logic for loading the dungeon room
  }
}
