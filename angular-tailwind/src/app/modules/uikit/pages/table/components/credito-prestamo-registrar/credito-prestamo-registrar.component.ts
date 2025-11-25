import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreditoPrestamoService } from '../../../../../../../../src/app/core/services/credito-prestamo.service';
import { CreditoPrestamo } from '../../../../../../../../src/app/core/models/credito-prestamo.model';
import { EntidadFinanciera } from '../../../../../../../../src/app/core/models/entidad-financiera.model';
import { Cliente } from '../../../../../../../../src/app/core/models/cliente.model';
import { Inmobiliaria } from '../../../../../../../../src/app/core/models/inmobiliaria.model';
import { Moneda } from '../../../../../../../../src/app/core/models/moneda.model';

// Ajusta las rutas de estos services según tu proyecto
import { EntidadFinancieraService } from '../../../../../../../../src/app/core/services/entidad-financiera.service';
import { ClienteService } from '../../../../../../../../src/app/core/services/cliente.service';
import { InmobiliariaService } from '../../../../../../../../src/app/core/services/inmobiliaria.service';
import { MonedaService } from '../../../../../../../../src/app/core/services/moneda.service';

@Component({
  selector: 'app-credito-prestamo-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credito-prestamo-registrar.component.html',
  styleUrls: ['./credito-prestamo-registrar.component.css'],
})
export class CreditoPrestamoRegistrarComponent implements OnInit {
  form!: FormGroup;

  entidades: EntidadFinanciera[] = [];
  clientes: Cliente[] = [];
  inmobiliarias: Inmobiliaria[] = [];
  monedas: Moneda[] = [];

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private creditoService: CreditoPrestamoService,
    private entidadService: EntidadFinancieraService,
    private clienteService: ClienteService,
    private inmobiliariaService: InmobiliariaService,
    private monedaService: MonedaService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCombos();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      plazo_meses: ['', [Validators.required]],
      tipo_gracia: ['', [Validators.required]],
      monto_bono: [0, [Validators.required, Validators.min(0)]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      capitalizacion: ['', [Validators.required]],
      estado: [true, [Validators.required]],
      meses_gracia: [0, [Validators.required, Validators.min(0)]],
      id_entidad: [null, [Validators.required]],
      id_cliente: [null, [Validators.required]],
      id_inmobiliaria: [null, [Validators.required]],
      id_moneda: [null, [Validators.required]],
    });
  }

  private loadCombos(): void {
    this.entidadService.list().subscribe((data) => (this.entidades = data));
    this.clienteService.list().subscribe((data) => (this.clientes = data));
    this.inmobiliariaService
      .list()
      .subscribe((data) => (this.inmobiliarias = data));
    this.monedaService.list().subscribe((data) => (this.monedas = data));
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const v = this.form.value;

    const credito: CreditoPrestamo = {
      plazo_meses: v.plazo_meses,
      tipo_gracia: v.tipo_gracia,
      monto_bono: v.monto_bono,
      fecha_inicio: v.fecha_inicio,
      fecha_fin: v.fecha_fin,
      capitalizacion: v.capitalizacion,
      estado: v.estado,
      meses_gracia: v.meses_gracia,
      id_entidad: { id_entidad: v.id_entidad } as EntidadFinanciera,
      id_cliente: { id_cliente: v.id_cliente } as Cliente,
      id_inmobiliaria: { id_inmobiliaria: v.id_inmobiliaria } as Inmobiliaria,
      id_moneda: { id_moneda: v.id_moneda } as Moneda,
    };

    this.creditoService.insert(credito).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Crédito registrado correctamente.';
        this.form.reset({
          plazo_meses: '',
          tipo_gracia: '',
          monto_bono: 0,
          fecha_inicio: '',
          fecha_fin: '',
          capitalizacion: '',
          estado: true,
          meses_gracia: 0,
          id_entidad: null,
          id_cliente: null,
          id_inmobiliaria: null,
          id_moneda: null,
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage =
          'Ocurrió un error al registrar el crédito. Revisa la consola.';
      },
    });
  }

  // helpers para mostrar errores en el template
  controlInvalid(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
