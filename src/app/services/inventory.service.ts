import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:8080/api/inventory';  // Adjust for your backend API

  constructor(private http: HttpClient) { }

  // Get player's inventory
  getInventory(characterId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory`);
  }

  // Add item to inventory (after buying from shop)
  addItemToInventory(characterId: number, itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { itemId });
  }

  // Remove item from inventory (after selling to shop)
  removeItemFromInventory(characterId: number, itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/remove`, { itemId });
  }
}
