import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'http://localhost:8080/api/bank';

  constructor(private http: HttpClient) {}

  // Get the bank information for the authenticated user's active character
  getBank(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  depositGold(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit`, { amount });
  }

  withdrawGold(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw`, { amount });
  }

  // Move an item from the character's inventory to the bank
  moveToBank(slotId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/move-to-bank`, { slotId });
  }

  // Move an item from the bank to the character's inventory
  moveToInventory(bankSlotId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/move-to-inventory`, { bankSlotId });
  }
}
