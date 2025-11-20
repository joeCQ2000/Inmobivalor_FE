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

  // GET /moneda/listar
  list(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.url}/listar`);
  }

  // POST /moneda/registrar
  insert(moneda: Moneda): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, moneda);
  }
}
