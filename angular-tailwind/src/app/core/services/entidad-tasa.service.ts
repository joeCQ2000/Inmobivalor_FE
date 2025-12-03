import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntidadTasa } from '../models/entidad-tasa.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EntidadTasaService {
  private url = `${base_url}/entidad_tasa`;

  constructor(private http: HttpClient) {}

  // GET /entidad_tasa/listar
  list(): Observable<EntidadTasa[]> {
    return this.http.get<EntidadTasa[]>(`${this.url}/listar`);
  }

  // POST /entidad_tasa/registrar
  insert(entidadTasa: EntidadTasa): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, entidadTasa);
  }
}
