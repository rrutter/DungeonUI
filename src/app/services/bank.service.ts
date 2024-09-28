import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'http://localhost:8080/api/bank';

  constructor(private http: HttpClient) {}

  // Get the bank information for a specific character
  getBank(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?characterId=${characterId}`);
  }

  // Deposit gold into the bank for a specific character
  depositGold(characterId: number, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit?characterId=${characterId}`, amount);
  }

  // Withdraw gold from the bank for a specific character
  withdrawGold(characterId: number, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw?characterId=${characterId}`, amount);
  }

  // Move an item from the character's inventory to the bank
  moveToBank(characterId: number, slotId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/move-to-bank?characterId=${characterId}`, { slotId });
  }

  // Move an item from the bank to the character's inventory
  moveToInventory(characterId: number, bankSlotId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/move-to-inventory?characterId=${characterId}`, { bankSlotId });
  }
}
