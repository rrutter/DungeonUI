import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrl: './town.component.css'
})

export class TownComponent implements OnInit {
  private selectedCharacter:any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.selectedCharacter = this.userService.getSelectedCharacter();

    // Call backend to ensure character is in town (locationId = 0)
    this.userService.getCharacterLocation(this.selectedCharacter.id).subscribe(
      (locationData) => {
        if (locationData.locationId !== 0) {
          this.router.navigate(['/game']);
        }
      },
      (error) => {
        console.error('Error verifying character location', error);
        this.router.navigate(['/menu']);
      }
    );
  }
}
