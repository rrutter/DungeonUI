import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

export interface Dungeon {
  id: number;
  name: string;
  theme: string;
  description: string;
  imageUrl: string;
  unlockHint: string;
  unlocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  private apiUrl = 'http://localhost:8080/api/dungeons';

  constructor(private http: HttpClient) {}

  getAllDungeons(): Observable<Dungeon[]> {
    return this.http.get<Dungeon[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching dungeons:', error);
    return throwError('Could not fetch dungeons. Please try again later.');
  }

}
