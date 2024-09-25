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
  private selectedCharacter: any = null;

  constructor(private http: HttpClient) {
    const storedUserData = localStorage.getItem(this.storageKey);
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
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

  // Send user data to backend to create an account
  createAccount(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, userData).pipe(
      tap((response) => {
        this.userData = response;
        localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
      })
    );
  }

  getCharacterData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character-data/races`);
  };

  getGenders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character-data/genders`);
  };

  getAlignments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character-data/alignments`);
  };

  createCharacter(characterData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters/create`, characterData, { headers: this.getAuthHeaders() });
  }

  getUserCharacters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/characters/user`, { headers: this.getAuthHeaders() });
  }

  setSelectedCharacter(character: any) {
    this.selectedCharacter = character;
  }

  getSelectedCharacter() {
    return this.selectedCharacter;
  }

  getCharacterLocation(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${characterId}/location`, { headers: this.getAuthHeaders() });
  }

  getCharacterGuilds(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${characterId}/guilds`, { headers: this.getAuthHeaders() });
  }

  getAllCharacterWorn(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${characterId}/worn`, { headers: this.getAuthHeaders() });
  }

  // Clear user data
  clearUserData(): void {
    this.userData = null;
    localStorage.removeItem(this.storageKey);
  }

  storeToken(token: string) {
    this.token = token;
    localStorage.setItem('id_token', token);
  }

// Method to retrieve the token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('id_token');
    }
    return this.token;
  }

  // **Method to store user info (optional)**
  storeUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }
}
