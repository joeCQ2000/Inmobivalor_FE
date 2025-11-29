import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Moneda } from '../models/moneda.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  private url = `${base_url}/moneda`;

  constructor(private http: HttpClient) {}

  // GET /moneda/listar - Lista todas las monedas
  list(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.url}/listar`);
  }

  // POST /moneda/registrar - Registra una nueva moneda
  insert(moneda: Moneda): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, moneda);
  }

  // GET /moneda/{id} - Obtiene una moneda por ID (para cuando se implemente en el backend)
  getById(id: number): Observable<Moneda> {
    return this.http.get<Moneda>(`${this.url}/${id}`);
  }

  // PUT /moneda/actualizar - Actualiza una moneda existente (para cuando se implemente en el backend)
  update(moneda: Moneda): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, moneda);
  }

  // DELETE /moneda/{id} - Elimina una moneda por ID (para cuando se implemente en el backend)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
