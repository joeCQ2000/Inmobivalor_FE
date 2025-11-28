import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TasaInteresService } from 'src/app/core/services/tasa-interes.service';
import { TasaInteres } from 'src/app/core/models/tasa-interes.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasa-interes-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasa-interes-registrar.component.html',
  styleUrls: ['./tasa-interes-registrar.component.css'],
})
export class TasaInteresRegistrarComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private tasaInteresService: TasaInteresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      tipo_tasa: ['', [Validators.required, Validators.maxLength(50)]],
      tasa_pct: ['', [Validators.required, Validators.min(0)]],
      estado: [true, [Validators.required]],
    });
  }

  volver(): void {
    this.router.navigate(['/components/tasa-interes']);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      Swal.fire({
        icon: 'error',
        title: 'Favor de rellenar los datos faltantes',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
        background: '#1E293B',
        color: '#ffff',
      });
      return;
    }

    this.loading = true;

    const tasa: TasaInteres = {
      tipo_tasa: this.form.value.tipo_tasa,
      tasa_pct: this.form.value.tasa_pct,
      estado: this.form.value.estado,
    };

    this.tasaInteresService.insert(tasa).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Tasa de interés registrada correctamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          background: '#1E293B',
          color: '#ffff',
        });
        this.router.navigate(['/components/tasa-interes']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error en el registro',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          background: '#1E293B',
          color: '#ffff',
        });
      },
    });
  }

  controlInvalid(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
