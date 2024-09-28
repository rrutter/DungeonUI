import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bankData: any;

  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    // Fetch bank data for the authenticated user's active character
    this.bankService.getBank().subscribe(data => {
      this.bankData = data;
    }, error => {
      console.error('Error fetching bank data', error);
    });
  }

  depositGold(amount: number): void {
    this.bankService.depositGold(amount).subscribe(() => {
      this.bankData.bankGold += amount;
    }, error => {
      console.error('Error depositing gold', error);
    });
  }

  withdrawGold(amount: number): void {
    this.bankService.withdrawGold(amount).subscribe(() => {
      this.bankData.bankGold -= amount;
    }, error => {
      console.error('Error withdrawing gold', error);
    });
  }

  moveToInventory(bankSlotId: number): void {
    this.bankService.moveToInventory(bankSlotId).subscribe(() => {
      this.ngOnInit();  // Reload the data after moving the item
    }, error => {
      console.error('Error moving item to inventory', error);
    });
  }
}
