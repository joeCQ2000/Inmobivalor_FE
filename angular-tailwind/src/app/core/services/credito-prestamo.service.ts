import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreditoPrestamo } from '../models/credito-prestamo.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CreditoPrestamoService {

  private url = `${base_url}/credito`;
  private listaCambio = new Subject<CreditoPrestamo[]>();

  constructor(private http: HttpClient) {}

list(): Observable<CreditoPrestamo[]> {
  return this.http.get<CreditoPrestamo[]>(`${this.url}/listar`);
}

insert(credito: CreditoPrestamo): Observable<void> {
  return this.http.post<void>(`${this.url}/registrar`, credito);
}


  // Estas tres SOLO funcionarán cuando crees los endpoints en el backend
  update(credito: CreditoPrestamo): Observable<void> {
    // Necesitarás un @PutMapping en el controller
    return this.http.put<void>(this.url, credito);
  }

  delete(id: number): Observable<void> {
    // Necesitarás un @DeleteMapping("/{id}") en el controller
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number): Observable<CreditoPrestamo> {
    // Necesitarás un @GetMapping("/{id}") en el controller
    return this.http.get<CreditoPrestamo>(`${this.url}/${id}`);
  }

  setList(listaNueva: CreditoPrestamo[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<CreditoPrestamo[]> {
    return this.listaCambio.asObservable();
  }
}
