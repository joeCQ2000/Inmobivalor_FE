import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Rol } from "../models/rol.model";
import { Observable } from "rxjs";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/cliente`;

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(`${this.url}/listar`);
  }
  insert(Rol: Rol): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/registrar`, Rol);
  }
}