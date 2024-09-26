import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'http://localhost:8080/api/shop';

  constructor(private http: HttpClient) { }

  getShopItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  buyItem(itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/buy`, { itemId }, { responseType: 'text' });
  }


  sellItem(itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/sell`, { slotNumber: itemId }, { responseType: 'text' });
  }
}
