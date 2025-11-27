import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmobiliariaService {


  private baseUrl = 'http://localhost:8080/inmobiliaria';
  constructor(private http:HttpClient) { }

  registrarInmobiliaria(inmobiliaria: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, inmobiliaria);
  }
}
