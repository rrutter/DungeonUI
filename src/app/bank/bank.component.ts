import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { CharacterService } from '../services/character.service';  // Assuming you have a character service to get selected character

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bankData: any;
  selectedCharacter: any;  // Store the selected character here

  constructor(private bankService: BankService, private characterService: CharacterService) {}

  ngOnInit(): void {
    // Get the selected character from character service
    this.selectedCharacter = this.characterService.getSelectedCharacter();

    if (this.selectedCharacter) {
      // Fetch bank data for the selected character
      this.bankService.getBank(this.selectedCharacter.id).subscribe(data => {
        this.bankData = data;
      });
    } else {
      console.error('No character selected');
    }
  }

  depositGold(amount: number): void {
    if (this.selectedCharacter) {
      this.bankService.depositGold(this.selectedCharacter.id, amount).subscribe(() => {
        this.bankData.bankGold += amount;
      });
    } else {
      console.error('No character selected');
    }
  }

  withdrawGold(amount: number): void {
    if (this.selectedCharacter) {
      this.bankService.withdrawGold(this.selectedCharacter.id, amount).subscribe(() => {
        this.bankData.bankGold -= amount;
      });
    } else {
      console.error('No character selected');
    }
  }

  moveToInventory(bankSlotId: number): void {
    if (this.selectedCharacter) {
      this.bankService.moveToInventory(this.selectedCharacter.id, bankSlotId).subscribe(() => {
        this.ngOnInit();  // Reload the data after moving the item
      });
    } else {
      console.error('No character selected');
    }
  }
}
