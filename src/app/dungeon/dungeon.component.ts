import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrl: './dungeon.component.css'
})

export class DungeonComponent implements OnInit {
  private selectedCharacter:any;
  level!: number;
  xPosition!: number;
  yPosition!: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.selectedCharacter = this.userService.getSelectedCharacter();
    this.verifyBackendLocation();
    this.loadDungeonRoom(this.selectedCharacter.level, this.selectedCharacter.xPosition, this.selectedCharacter.yPosition);
  }

  loadDungeonRoom(level: number, xPosition: number, yPosition: number) {

  }

  verifyBackendLocation(): void {
    this.userService.getCharacterLocation(this.selectedCharacter.id).subscribe(
      (locationId: number) => {
        if (locationId === this.selectedCharacter.locationId) {
          // Load dungeon room if the location matches
          this.loadDungeonRoom(this.selectedCharacter.level, this.selectedCharacter.xPosition, this.selectedCharacter.yPosition);
        } else {
          // If location doesn't match, redirect to the correct location
          if (locationId === 0) {
            this.router.navigate(['/town']);
          } else {
            this.router.navigate(['/dungeon']);
          }
        }
      },
      error => {
        console.error('Error verifying character location', error);
        this.router.navigate(['/menu']);
      }
    );
  }

}
