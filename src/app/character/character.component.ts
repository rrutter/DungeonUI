import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { InventoryService } from '../services/inventory.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  characterWorn: any;
  playerItems: any[] = [];
  selectedCharacter: any;

  isMobile: boolean = false;
  showSilhouette: boolean = true;

  constructor(
    private characterService: CharacterService,
    private inventoryService: InventoryService,
    private router: Router,
    private cdRef: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectedCharacter = this.characterService.getSelectedCharacter();
    this.loadCharacterWorn();
    this.loadPlayerInventory();
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  // Load character's worn equipment
  loadCharacterWorn(): void {
    this.characterService.getAllCharacterWorn()
      .pipe(
        tap(wornData => {
          this.characterWorn = wornData;
          this.cdRef.detectChanges();  // Manually trigger change detection
        }),
        tap({
          error: (error) => console.error('Error fetching worn items', error)
        })
      )
      .subscribe();
  }

  // Load player's inventory
  loadPlayerInventory(): void {
    this.inventoryService.getInventory(this.selectedCharacter.id)
      .pipe(
        tap((items) => {
          this.playerItems = items;
          this.cdRef.detectChanges();  // Manually trigger change detection
        }),
        tap({
          error: (error) => console.error('Error fetching player inventory', error)
        })
      )
      .subscribe();
  }

  // Handle item interaction on character silhouette
  handleSilhouetteClick(slot: string): void {
    const slotItem = this.characterWorn?.[slot];
    if (slotItem) {
      // If there's an item equipped in the slot, unequip it
      this.unequipItem(slot);
    } else {
      // If the slot is empty, do nothing
      console.log(`Slot ${slot} is empty, no action performed.`);
    }
  }

  // Equip item from inventory
  equipItem(slot: string): void {
    console.log('equipping item:', slot);
    const selectedItem = this.playerItems.find(item => item.slotNumber === slot);
    if (selectedItem) {
      this.characterService.equipItem(slot)
        .pipe(
          tap(() => {
            console.log('Item equipped');
            this.updateUIAfterTransaction();  // Refresh UI after equip action
          }),
          tap({
            error: (error) => console.error('Error equipping item', error)
          })
        )
        .subscribe();
    }
  }

  // Unequip item from the silhouette slot
  unequipItem(slot: string): void {
    this.characterService.unequipItem(slot)
      .pipe(
        tap(() => {
          console.log('Item unequipped');
          this.updateUIAfterTransaction();  // Refresh UI after unequip action
        }),
        tap({
          error: (error) => console.error('Error unequipping item', error)
        })
      )
      .subscribe();
  }

  // Refresh UI after a transaction and trigger change detection
  updateUIAfterTransaction(): void {
    this.loadCharacterWorn();  // Reload worn data
    this.loadPlayerInventory();  // Reload inventory
    this.cdRef.detectChanges();  // Manually trigger change detection
  }

  // Navigate back to the town screen
  goToTown(): void {
    this.router.navigate(['/town']);
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
  }

  toggleView(view: string) {
    this.showSilhouette = view === 'silhouette';
  }
}
