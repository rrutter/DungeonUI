import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';  // Import UserService for authentication

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://localhost:8080/api';
  private selectedCharacter: any = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  // Character creation
  createCharacter(characterData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters/create`, characterData, { headers: this.userService.getAuthHeaders() });
  }

  // Fetch user characters
  getUserCharacters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/characters/user`, { headers: this.userService.getAuthHeaders() });
  }

  setSelectedCharacter(character: any): void {
    this.selectedCharacter = character;

    // Call the backend to set the active character for the authenticated user
    this.setActiveCharacter(character.id).subscribe(() => {
      console.log(`Active character set: ${character.name}`);
    }, error => {
      console.error('Error setting active character', error);
    });
  }

  private setActiveCharacter(characterId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters/set-active`, characterId, { headers: this.userService.getAuthHeaders() });
  }

  getSelectedCharacter(): any {
    return this.selectedCharacter;
  }

  // Fetch character location
  getCharacterLocation(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${characterId}/location`, { headers: this.userService.getAuthHeaders() });
  }

  // Fetch character guilds
  getCharacterGuilds(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${characterId}/guilds`, { headers: this.userService.getAuthHeaders() });
  }

  // Fetch character worn items
  getAllCharacterWorn(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${characterId}/worn`, { headers: this.userService.getAuthHeaders() });
  }

  // Fetch character creation data (races, genders, alignments)
  getCharacterData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character-data/races`);
  }

  getGenders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character-data/genders`);
  }

  getAlignments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character-data/alignments`);
  }

  joinGuild(characterId: number, guildId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters/${characterId}/join-guild`, { guildId });
  }
}
