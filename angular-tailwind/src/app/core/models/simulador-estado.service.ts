import { Injectable } from '@angular/core';
import { SimulacionFrancesResponseDTO } from 'src/app/core/models/simulador.financiero.model';

@Injectable({ providedIn: 'root' })
export class SimuladorEstadoService
 {
  private simulacion?: SimulacionFrancesResponseDTO;

  setSimulacion(sim: SimulacionFrancesResponseDTO): void {
    this.simulacion = sim;
  }

  getSimulacion(): SimulacionFrancesResponseDTO | undefined {
    return this.simulacion;
  }

  clear(): void {
    this.simulacion = undefined;
  }
}