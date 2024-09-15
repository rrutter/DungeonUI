import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Import tap to handle side effects

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;
  private apiUrl = 'http://localhost:8080/api/users';  // Your backend endpoint
  private storageKey = 'userData';  // Key to store user data in localStorage

  constructor(private http: HttpClient) {
    // Load stored user data from localStorage when service initializes
    const storedUserData = localStorage.getItem(this.storageKey);
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  getUserData(): any {
    return this.userData;
  }

  // Send user data to backend to create an account
  createAccount(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userData).pipe(
      tap((response) => {
        // Store the actual data returned from the backend and persist it in localStorage
        this.userData = response;
        localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
      })
    );
  }

  clearUserData(): void {
    this.userData = null;
    localStorage.removeItem(this.storageKey);
  }
}
