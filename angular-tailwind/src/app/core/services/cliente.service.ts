import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente } from '../models/cliente.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = `${base_url}/cliente`;

  constructor(private http: HttpClient) {}

  // GET /cliente/listar
  list(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/listar`);
  }

  // POST /cliente/registrar
  insert(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, cliente);
  }
}
