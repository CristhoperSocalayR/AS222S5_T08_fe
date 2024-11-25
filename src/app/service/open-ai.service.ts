import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OpenAiQuery} from '../model/OpenAiQuery'

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private readonly apiUrl = 'https://expert-train-wp6v4v999vphwgp-8085.app.github.dev/api/openai'; // Cambiar según tu configuración

  constructor(private http: HttpClient) {}

  getResponse(prompt: string): Observable<OpenAiQuery> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get<OpenAiQuery>(`${this.apiUrl}`, { params });
  }

  createQuery(prompt: string): Observable<OpenAiQuery> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.post<OpenAiQuery>(`${this.apiUrl}`, null, { params });
  }

  updateQuery(id: number, newPrompt: string): Observable<OpenAiQuery> {
    const params = new HttpParams().set('newPrompt', newPrompt);
    return this.http.put<OpenAiQuery>(`${this.apiUrl}/${id}`, null, { params });
  }

  deleteQuery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listAllQueries(): Observable<OpenAiQuery[]> {
    return this.http.get<OpenAiQuery[]>(`${this.apiUrl}/all`);
  }
}
