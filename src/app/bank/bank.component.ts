import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { InventoryService } from '../services/inventory.service';  // To get inventory data
import { Router } from '@angular/router';
import { CharacterService } from "../services/character.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bankData: any;
  playerItems: any[] = [];
  character: any;

  constructor(
    private bankService: BankService,
    private inventoryService: InventoryService,
    private characterService: CharacterService,
    private router: Router,
    private cdRef: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.character = this.characterService.getSelectedCharacter();  // temporary until we update the inventory service
    this.loadBankData();
    this.loadPlayerInventory();  // Load player's inventory when the component initializes
  }

  // Load bank data for the authenticated user's active character
  loadBankData(): void {
    this.bankService.getBank()
      .pipe(
        tap((data) => this.bankData = data),
        tap({
          error: (error) => console.error('Error fetching bank data', error)
        })
      )
      .subscribe();
  }

  // Load the player's inventory
  loadPlayerInventory(): void {
    this.inventoryService.getInventory(this.character.id)
      .pipe(
        tap((items) => this.playerItems = items),
        tap({
          error: (error) => console.error('Error fetching player inventory', error)
        })
      )
      .subscribe();
  }

  // Deposit gold into the bank
  depositGold(amount: number): void {
    this.bankService.depositGold(amount)
      .pipe(
        tap(() => {
          console.log('Gold deposited');
          this.updateUIAfterTransaction();  // Refresh both bank and inventory
        }),
        tap({
          error: (error) => console.error('Error depositing gold', error)
        })
      )
      .subscribe();
  }

  // Withdraw gold from the bank
  withdrawGold(amount: number): void {
    this.bankService.withdrawGold(amount)
      .pipe(
        tap(() => {
          console.log('Gold withdrawn');
          this.updateUIAfterTransaction();  // Refresh both bank and inventory
        }),
        tap({
          error: (error) => console.error('Error withdrawing gold', error)
        })
      )
      .subscribe();
  }

  // Move an item from inventory to the bank
  moveToBank(item: any): void {
    this.bankService.moveToBank(item.slotNumber)
      .pipe(
        tap(() => {
          console.log('Item moved to bank');
          this.updateUIAfterTransaction();  // Refresh both bank and inventory
        }),
        tap({
          error: (error) => console.error('Error moving item to bank', error)
        })
      )
      .subscribe();
  }

  // Move an item from the bank to inventory
  moveToInventory(bankSlotId: number): void {
    this.bankService.moveToInventory(bankSlotId)
      .pipe(
        tap(() => {
          console.log('Item moved to inventory');
          this.updateUIAfterTransaction();  // Refresh both bank and inventory
        }),
        tap({
          error: (error) => console.error('Error moving item to inventory', error)
        })
      )
      .subscribe();
  }

  // Refresh UI after transaction and manually trigger change detection
  updateUIAfterTransaction(): void {
    this.loadBankData();  // Reload bank data
    this.loadPlayerInventory();  // Reload inventory
    this.cdRef.detectChanges();  // Manually trigger change detection
  }

  // Go back to town
  goToTown(): void {
    this.router.navigate(['/town']);
  }
}
