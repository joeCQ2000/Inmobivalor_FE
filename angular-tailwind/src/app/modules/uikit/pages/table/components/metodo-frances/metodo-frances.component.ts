import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  cronogramaDTO,
  datoscronogramaDTO,
  SimulacionFrancesResponseDTO,
} from 'src/app/core/models/simulador.financiero.model';
import { SimuladorFinancieroService } from 'src/app/core/services/simuladorfinanciero.service';
import { CommonModule } from '@angular/common';
import { CronogramaView } from 'src/app/core/models/cronogramaview.model';

@Component({
  selector: 'app-metodo-frances',
  templateUrl: './metodo-frances.component.html',
  styleUrls: ['./metodo-frances.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // <--- importante
})
export class MetodoFrancesComponent implements OnInit {
  metodoFrancesForm!: FormGroup;

  simulacion?: SimulacionFrancesResponseDTO;
  cronogramaView: CronogramaView[] = []; // <--- tabla ya formateada

  cargando = false;
  error?: string;

  // límite de cuotas “sanas” para la UI
  private readonly maxCuotasUI = 600;

  constructor(
    private fb: FormBuilder,
    private simuladorService: SimuladorFinancieroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.metodoFrancesForm = this.fb.group({
      // Datos del crédito
      precio_venta_activo: [null, [Validators.required, Validators.min(1)]],
      porcentaje_cuota_inicial: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      numero_anhos: [null, [Validators.required, Validators.min(1)]],
      frecuencia_pago: [null, [Validators.required, Validators.min(1)]],
      numero_dias_por_anho: [360, [Validators.required, Validators.min(1)]],

      tea: [null, [Validators.required, Validators.min(0)]],
      tipo_gracia: ['SIN', [Validators.required]], // SIN, TOTAL, PARCIAL
      meses_gracia: [0, [Validators.required, Validators.min(0)]],

      // Costos iniciales
      costes_notariales: [null, [Validators.min(0)]],
      costes_registrales: [null, [Validators.min(0)]],
      tasacion: [null, [Validators.min(0)]],
      comision_estudio: [null, [Validators.min(0)]],
      comision_activacion: [null, [Validators.min(0)]],

      // Costos periódicos y seguros
      comision_periodica: [null, [Validators.min(0)]],
      portes: [null, [Validators.min(0)]],
      gastos_administracion: [null, [Validators.min(0)]],
      porcentaje_seguro_desgravamen: [
        null,
        [Validators.required, Validators.min(0)],
      ],
      porcentaje_seguro_riesgo: [
        null,
        [Validators.required, Validators.min(0)],
      ],

      tasa_descuento: [null, [Validators.required, Validators.min(0)]],
    });
  }

  // formateador local, se ejecuta SOLO al llegar la respuesta
  private format2(v: number): string {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);
  }

  // trackBy para que Angular no recree las filas
  trackCuota(_index: number, item: CronogramaView): number {
    return item.numero_cuota;
  }

  simular(): void {
    if (this.metodoFrancesForm.invalid) {
      this.metodoFrancesForm.markAllAsTouched();
      return;
    }

    const v = this.metodoFrancesForm.value;

    // cálculo de número de cuotas que REALMENTE se generarán
    const nCuotas =
      (v.numero_anhos ?? 0) * (v.frecuencia_pago ?? 0);

    if (nCuotas > this.maxCuotasUI) {
      this.error = `El número de cuotas (${nCuotas}) es demasiado alto para mostrar el cronograma completo. Reduce años o frecuencia.`;
      this.simulacion = undefined;
      this.cronogramaView = [];
      this.cdr.markForCheck();
      return;
    }

    const datos: datoscronogramaDTO = {
      precio_venta_activo: v.precio_venta_activo,
      porcentaje_cuota_inicial: v.porcentaje_cuota_inicial,
      numero_anhos: v.numero_anhos,
      frecuencia_pago: v.frecuencia_pago,
      numero_dias_por_anho: v.numero_dias_por_anho,

      tea: v.tea,
      tipo_gracia: v.tipo_gracia,
      meses_gracia: v.meses_gracia,

      // si el usuario deja algo vacío, lo mandamos como 0 al backend
      costes_notariales: v.costes_notariales ?? 0,
      costes_registrales: v.costes_registrales ?? 0,
      tasacion: v.tasacion ?? 0,
      comision_estudio: v.comision_estudio ?? 0,
      comision_activacion: v.comision_activacion ?? 0,

      comision_periodica: v.comision_periodica ?? 0,
      portes: v.portes ?? 0,
      gastos_administracion: v.gastos_administracion ?? 0,
      porcentaje_seguro_desgravamen: v.porcentaje_seguro_desgravamen,
      porcentaje_seguro_riesgo: v.porcentaje_seguro_riesgo,

      tasa_descuento: v.tasa_descuento,

      // calculados por el backend
      saldo_a_financiar: 0,
      monto_prestamo: 0,
      numero_cuotas_por_anho: 0,
      numero_total_cuotas: 0,
      total_intereses: 0,
      total_amortizacion_capital: 0,
      total_seguro_desgravamen: 0,
      total_seguro_riesgo: 0,
      total_comisiones_periodicas: 0,
      total_portes_y_gastos_adm: 0,
    };

    this.cargando = true;
    this.error = undefined;
    this.simulacion = undefined;
    this.cronogramaView = [];
    this.cdr.markForCheck();

    console.time('SIMULACION_FRONT'); // medir solo front

    this.simuladorService.simularFrances(datos).subscribe({
      next: (resp) => {
        console.log('LLEGÓ RESPUESTA', resp);
        this.simulacion = resp;

        // construir tabla ya formateada (una vez)
        this.cronogramaView = (resp.cronograma ?? []).map((c) => ({
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

        this.cargando = false;
        console.timeEnd('SIMULACION_FRONT'); // cuánto tarda en todo el flujo de front
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('ERROR SIMULACIÓN', err);
        this.error = 'Ocurrió un error al simular el crédito.';
        this.cargando = false;
        console.timeEnd('SIMULACION_FRONT');
        this.cdr.markForCheck();
      },
    });
  }

  limpiar(): void {
    this.metodoFrancesForm.reset({
      numero_dias_por_anho: 360,
      tipo_gracia: 'SIN',
      meses_gracia: 0,
    });
    this.simulacion = undefined;
    this.cronogramaView = [];
    this.error = undefined;
    this.cdr.markForCheck();
  }
}

