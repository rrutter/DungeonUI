import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';  // Import tap to handle side effects

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;
  private token: string | null = null;
  private userInfo: any = null;
  private apiUrl = 'http://localhost:8080/api';
  private storageKey = 'userData';

  constructor(private http: HttpClient) {
    const storedUserData = localStorage.getItem(this.storageKey);
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  // Manage user authentication and account creation
  createAccount(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, userData).pipe(
      tap((response) => {
        this.userData = response;
        localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
      })
    );
  }

  getUserData(): any {
    return this.userData;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken() || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Token management
  storeToken(token: string) {
    this.token = token;
    localStorage.setItem('id_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('id_token');
    }
    return this.token;
  }

  // Clear user data
  clearUserData(): void {
    this.userData = null;
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('id_token');
  }

  // Store user information
  storeUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }

  // **Method to retrieve user info**
  getUserInfo(): any {
    if (!this.userInfo) {
      const storedInfo = localStorage.getItem('user_info');
      if (storedInfo) {
        this.userInfo = JSON.parse(storedInfo);
      }
    }
    return this.userInfo;
  }
}
