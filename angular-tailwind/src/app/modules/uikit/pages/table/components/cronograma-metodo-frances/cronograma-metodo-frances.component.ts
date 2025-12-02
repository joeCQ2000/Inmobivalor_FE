import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulacionFrancesResponseDTO } from 'src/app/core/models/simulador.financiero.model';
import { SimuladorEstadoService } from 'src/app/core/models/simulador-estado.service';
import { CronogramaView } from 'src/app/core/models/cronogramaview.model';

@Component({
  selector: 'app-cronograma-frances',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cronograma-metodo-frances.component.html',
})
export class CronogramaFrancesComponent implements OnInit {
  simulacion?: SimulacionFrancesResponseDTO;
  cronogramaView: CronogramaView[] = [];

  constructor(
    private state: SimuladorEstadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.simulacion = this.state.getSimulacion();
    console.log('SIMULACION EN STATE', this.simulacion);

    if (!this.simulacion) {
      
      this.router.navigate(['../metodo_frances'], { relativeTo: this.route });
      return;
    }

    this.cronogramaView = (this.simulacion.cronograma ?? []).map((c) => ({
      numero_cuota: c.numero_cuota,
      periodo_gracia: c.periodo_gracia,
      saldo_inicial: this.format2(c.saldo_inicial),
      interes: this.format2(Math.abs(c.interes)),
      amortizacion: this.format2(Math.abs(c.amortizacion)),
      cuota_inc_seg: this.format2(
        Math.abs(c.cuota_incluye_seguro_desgravamen)
      ),
      seg_des: this.format2(Math.abs(c.seguro_desgravamen)),
      seg_riesgo: this.format2(Math.abs(c.seguro_riesgo)),
      comision: this.format2(Math.abs(c.comision)),
      portes: this.format2(Math.abs(c.portes)),
      gastos: this.format2(Math.abs(c.gastos_administracion)),
      saldo_final: this.format2(c.saldo_final),
      flujo: this.format2(c.flujo),
    }));

    console.log('CRONOGRAMA VIEW', this.cronogramaView);
  }

  private format2(v: number): string {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);
  }

  trackCuota(_index: number, item: CronogramaView): number {
    return item.numero_cuota;
  }

  volver(): void {
    this.router.navigate(['../metodo_frances'], { relativeTo: this.route });
  }

  siguiente(): void {
    this.router.navigate(['../indicadores'], { relativeTo: this.route });
  }
}
