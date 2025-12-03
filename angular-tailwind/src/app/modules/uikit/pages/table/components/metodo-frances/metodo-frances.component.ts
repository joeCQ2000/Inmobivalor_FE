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
  datoscronogramaDTO,
  SimulacionFrancesResponseDTO,
} from 'src/app/core/models/simulador.financiero.model';
import { SimuladorFinancieroService } from 'src/app/core/services/simuladorfinanciero.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SimuladorEstadoService } from 'src/app/core/models/simulador-estado.service';
import { EntidadFinancieraService } from 'src/app/core/services/entidad-financiera.service';
import { EntidadFinanciera } from 'src/app/core/models/entidad-financiera.model';
import { CreditoPrestamo } from 'src/app/core/models/credito-prestamo.model';
import { CreditoPrestamoService } from 'src/app/core/services/credito-prestamo.service';
import { CreditoComboDTO } from 'src/app/core/models/CreditoComboDTO.model';

@Component({
  selector: 'app-metodo-frances',
  templateUrl: './metodo-frances.component.html',
  styleUrls: ['./metodo-frances.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetodoFrancesComponent implements OnInit {
  metodoFrancesForm!: FormGroup;
entidades :EntidadFinanciera[] =[];
creditos : CreditoComboDTO[] = [];
  cargando = false;
  error?: string;
submitted = false;
  private readonly maxCuotasUI = 600;

  constructor(
    private fb: FormBuilder,
    private simuladorService: SimuladorFinancieroService,
    private simuladorState: SimuladorEstadoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route : ActivatedRoute,
    private entidadservice : EntidadFinancieraService,
    private creditoservice : CreditoPrestamoService
  ) {}

  ngOnInit(): void {
    this.metodoFrancesForm = this.fb.group({
      precio_venta_activo: [null, [Validators.required, Validators.min(1)]],
      porcentaje_cuota_inicial: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      numero_anhos: [0],
      frecuencia_pago: [null, [Validators.required, Validators.min(1)]],
      numero_dias_por_anho: [360, [Validators.required, Validators.min(1)]],
      tipo_gracia: ['SIN', [Validators.required]],
      meses_gracia: [0, [Validators.required, Validators.min(0)]],
      costes_notariales: [null, [Validators.min(0)]],
      costes_registrales: [null, [Validators.min(0)]],
      tasacion: [null, [Validators.min(0)]],
      comision_estudio: [null, [Validators.min(0)]],
      comision_activacion: [null, [Validators.min(0)]],
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
      prepago : [0, [Validators.min(0)]],
      cuotaPrepago :[0, [Validators.min(0)]],
      entidadId : [0, Validators.required],
     idCredito : [0, Validators.required],
    });
    this.entidadservice.list().subscribe((data) => (this.entidades = data));
     this.metodoFrancesForm.get('entidadId')?.valueChanges.subscribe((entidadId) => {
    this.onEntidadChange(entidadId);
  });

  }
onEntidadChange(entidadId: number): void {
  // Limpiar lista y selección de crédito
  this.creditos = [];
  this.metodoFrancesForm.patchValue({ id_credito: null }, { emitEvent: false });

  if (!entidadId) {
    return;
  }

  this.creditoservice.listarPorEntidad(entidadId).subscribe({
    next: (data) => {
      this.creditos = data;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('Error cargando créditos por entidad', err);
      this.creditos = [];
      this.cdr.markForCheck();
    },
  });
}
  simular(): void {
    if (this.metodoFrancesForm.invalid) {
      this.metodoFrancesForm.markAllAsTouched();
      return;
    }

    const v = this.metodoFrancesForm.value;
    const nCuotas = (v.numero_anhos ?? 0) * (v.frecuencia_pago ?? 0);
    if (nCuotas > this.maxCuotasUI) {
      this.error = `El número de cuotas (${nCuotas}) es demasiado alto.`;
      this.cdr.markForCheck();
      return;
    }

    const datos: datoscronogramaDTO = {
      precio_venta_activo: v.precio_venta_activo,
      porcentaje_cuota_inicial: v.porcentaje_cuota_inicial,
      numero_anhos: 0,
      frecuencia_pago: v.frecuencia_pago,
      numero_dias_por_anho: v.numero_dias_por_anho,
      tea: v.tea,
      tipo_gracia: v.tipo_gracia,
      meses_gracia: v.meses_gracia,
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
      cuotaPrepago :v.cuotaPrepago,
      prepago : v.prepago,
      idCredito : v.idCredito,
      entidadId : v.entidadId,
    };

    this.cargando = true;
    this.error = undefined;
    this.cdr.markForCheck();

    this.simuladorService.simularFrances(datos).subscribe({
      next: (resp) => {
        // Guardar simulación en el state
        this.simuladorState.setSimulacion(resp);
        this.cargando = false;
        this.cdr.markForCheck();

        // Navegar a la vista de cronograma
        this.router.navigate(['../cronograma'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error('ERROR SIMULACIÓN', err);
        this.error = 'Ocurrió un error al simular el crédito.';
        this.cargando = false;
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
    this.error = undefined;
    this.cdr.markForCheck();
  }
}
