import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class InmobiliariaService {
  private url = `${base_url}/inmobiliaria`;
  constructor(private http: HttpClient) {}

  registrarInmobiliaria(inmobiliaria: any): Observable<any> {
    return this.http.post<any>(`${this.url}/registrar`, inmobiliaria);
  }
  listarInmobiliarias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/listar`);
  }

  buscarInmobiliarias(filtro: {
    estado?: boolean; // opcional, pero ojo con el backend (te explico abajo)
    situacion_inmobiliaria?: string;
    ubicacion?: string;
  }): Observable<any[]> {
    let params = new HttpParams();

    // Solo mandamos el param si viene definido
    if (filtro.estado !== undefined && filtro.estado !== null) {
      params = params.set('estado', String(filtro.estado)); // "true" o "false"
    }

    if (filtro.situacion_inmobiliaria) {
      params = params.set('situacion_inmobiliaria', filtro.situacion_inmobiliaria);
    }

    if (filtro.ubicacion) {
      params = params.set('ubicacion', filtro.ubicacion);
    }

    return this.http.get<any[]>(`${this.url}/buscar`, { params });
  }

  obtenerInmobiliariaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  // ===== NUEVO: ACTUALIZAR =====
  actualizarInmobiliaria(inmobiliaria: any): Observable<any> {
    const id = inmobiliaria.idInmobiliaria || inmobiliaria.id_inmobiliaria || inmobiliaria.id;
    return this.http.put<any>(`${this.url}/actualizar/${id}`, inmobiliaria);
  }
}
