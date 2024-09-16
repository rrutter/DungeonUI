import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  // Clear the stored user data
  clearUserData(): void {
    this.userData = null;
    localStorage.removeItem(this.storageKey);
  }

  // Stub method to create a character
  createCharacter(characterData: any): Observable<any> {
    const url = `${this.apiUrl}/create-character`;  // Stub API endpoint

    // Returning a mock response for now until the backend is ready
    // Replace this with actual HTTP POST call when backend is available
    return of({ success: true, characterId: 1, characterData }).pipe(
      tap(response => {
        console.log('Character created:', response);
      })
    );

    // Uncomment the actual backend call once it's implemented:
    // return this.http.post(url, characterData).pipe(
    //   tap((response) => {
    //     console.log('Character created successfully:', response);
    //   })
    // );
  }
}
