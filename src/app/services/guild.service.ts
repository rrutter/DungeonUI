import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  private apiUrl = 'http://localhost:8080/api/guilds';

  constructor(private http: HttpClient) {}

  getAllGuilds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  getGuildRequirements(guildId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${guildId}/requirements`);
  }
}
