import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Inmobiliaria } from '../models/inmobiliaria.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class InmobiliariaService {
  private url = `${base_url}/inmobiliaria`;

  constructor(private http: HttpClient) {}

  // GET /inmobiliaria/listar
  list(): Observable<Inmobiliaria[]> {
    return this.http.get<Inmobiliaria[]>(`${this.url}/listar`);
  }

  // POST /inmobiliaria/registrar
  insert(inmob: Inmobiliaria): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, inmob);
  }
}
