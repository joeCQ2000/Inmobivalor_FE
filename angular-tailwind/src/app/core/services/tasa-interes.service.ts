import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { TasaInteres } from '../models/tasa-interes.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TasaInteresService {
  private url = `${base_url}/tasa_interes`;

  constructor(private http: HttpClient) {}

  // GET /tasa_interes/listar - Lista todas las tasas de interés
  list(): Observable<TasaInteres[]> {
    return this.http.get<TasaInteres[]>(`${this.url}/listar`);
  }

  // POST /tasa_interes/registrar - Registra una nueva tasa de interés
  insert(tasaInteres: TasaInteres): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, tasaInteres);
  }

  // GET /tasa_interes/{id} - Obtiene una tasa de interés por ID (para cuando se implemente en el backend)
  getById(id: number): Observable<TasaInteres> {
    return this.http.get<TasaInteres>(`${this.url}/${id}`);
  }

  // PUT /tasa_interes/actualizar - Actualiza una tasa de interés existente (para cuando se implemente en el backend)
  update(tasaInteres: TasaInteres): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, tasaInteres);
  }

  // DELETE /tasa_interes/{id} - Elimina una tasa de interés por ID (para cuando se implemente en el backend)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
