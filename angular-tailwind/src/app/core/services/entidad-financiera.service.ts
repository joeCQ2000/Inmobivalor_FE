import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntidadFinanciera } from '../models/entidad-financiera.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EntidadFinancieraService {
  private url = `${base_url}/entidad_financiera`;

  constructor(private http: HttpClient) {}

  // GET /entidad_financiera/listar
  list(): Observable<EntidadFinanciera[]> {
    return this.http.get<EntidadFinanciera[]>(`${this.url}/listar`);
  }

  // POST /entidad_financiera/registrar
  insert(entidad: EntidadFinanciera): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, entidad);
  }
}
