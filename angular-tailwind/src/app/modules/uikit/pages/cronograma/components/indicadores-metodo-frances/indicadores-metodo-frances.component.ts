import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulacionFrancesResponseDTO } from 'src/app/core/models/simulador.financiero.model';
import { SimuladorEstadoService } from 'src/app/core/models/simulador-estado.service';

@Component({
  selector: 'app-indicadores-frances',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicadores-metodo-frances.component.html',
})
export class IndicadoresFrancesComponent implements OnInit {
  simulacion?: SimulacionFrancesResponseDTO;

  constructor(
    private state: SimuladorEstadoService,
    private router: Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.simulacion = this.state.getSimulacion();
    if (!this.simulacion) {
      this.router.navigate(['../metodo_frances'], { relativeTo: this.route });
    }
  }

  volver(): void {
    this.router.navigate(['../cronograma'], { relativeTo: this.route });
  }

  nuevaSimulacion(): void {
    this.state.clear();
    this.router.navigate(['../metodo_frances'], { relativeTo: this.route });
  }
}
