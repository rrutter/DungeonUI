import { Component, OnInit } from '@angular/core';
import { DungeonService, Dungeon } from '../services/dungeon.service';

@Component({
  selector: 'app-dungeon-list',
  templateUrl: './dungeon-list.component.html',
  styleUrls: ['./dungeon-list.component.css']
})
export class DungeonListComponent implements OnInit {
  dungeons: Dungeon[] = [];

  constructor(private dungeonService: DungeonService) {}

  ngOnInit(): void {
    this.loadDungeons();
  }

  loadDungeons(): void {
    this.dungeonService.getAllDungeons().subscribe(dungeons => {
      this.dungeons = dungeons;
    });
  }

  enterDungeon(dungeon: Dungeon): void {
    if (dungeon.unlocked) {
      console.log(`Entering ${dungeon.name}`);
      // Logic for entering the dungeon (e.g., navigate to dungeon, load dungeon scene)
    } else {
      alert(`Dungeon is locked! Hint: ${dungeon.unlockHint}`);
    }
  }
}
