import { Injectable } from '@angular/core';;
import { HttpClient } from '@angular/common/http';
import { usuario } from '../models/usuario.model';
import { Observable, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SimulacionFrancesResponseDTO, datoscronogramaDTO } from '../models/simulador.financiero.model';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SimuladorFinancieroService {
  private url = `${base_url}/simulador`;
  constructor(private httpClient: HttpClient) {}
   simularFrances(
    datos: datoscronogramaDTO
  ): Observable<SimulacionFrancesResponseDTO> {
    return this.httpClient.post<SimulacionFrancesResponseDTO>(`${this.url}/frances`,datos);
  }
}