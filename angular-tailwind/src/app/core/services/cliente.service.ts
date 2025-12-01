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

  constructor(private httpClient: HttpClient) {}

  // GET /cliente/listar
  list(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.url}/listar`);
  }

  // POST /cliente/registrar
  insert(cliente: Cliente): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/registrar`, cliente);
  }
  Actualizar (id: number, cliente: Cliente){
  return this.httpClient.put(`${this.url}/actualizar`,cliente);
}
  listid(id:number){
  return this.httpClient.get<Cliente>(`${this.url}/${id}`)
  }
}
