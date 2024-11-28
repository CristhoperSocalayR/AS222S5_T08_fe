import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OpenAiQuery } from '../model/OpenAiQuery'; // Asegúrate de tener el modelo de datos

@Injectable({
  providedIn: 'root'
})
export class AzureOpenAiService {

  private apiUrl = `${environment.BACK_URL}/api/openai`;

  constructor(private http: HttpClient) {}

  // Obtener respuesta de OpenAI
  getOpenAiResponse(prompt: string): Observable<OpenAiQuery> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get<OpenAiQuery>(this.apiUrl, { params });
  }

  // Crear una nueva consulta de OpenAI
  createQuery(prompt: string): Observable<OpenAiQuery> {
    // Se debe enviar el prompt en el cuerpo, no en los parámetros
    return this.http.post<OpenAiQuery>(this.apiUrl, { prompt });
  }

  // Actualizar una consulta de OpenAI
  updateQuery(id: number, newPrompt: string): Observable<OpenAiQuery> {
    return this.http.put<OpenAiQuery>(`${this.apiUrl}/${id}`, { prompt: newPrompt });
  }

  // Eliminar una consulta de OpenAI
  deleteQuery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Listar todas las consultas de OpenAI
  listAllQueries(): Observable<OpenAiQuery[]> {
    return this.http.get<OpenAiQuery[]>(`${this.apiUrl}/all`);
  }
}
