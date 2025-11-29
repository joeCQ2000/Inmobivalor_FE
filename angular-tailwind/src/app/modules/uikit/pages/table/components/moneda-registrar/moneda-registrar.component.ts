import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MonedaService } from 'src/app/core/services/moneda.service';
import { Moneda } from 'src/app/core/models/moneda.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moneda-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './moneda-registrar.component.html',
  styleUrls: ['./moneda-registrar.component.css'],
})
export class MonedaRegistrarComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private monedaService: MonedaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      tipo_moneda: ['', [Validators.required, Validators.maxLength(20)]],
      estado: [true, [Validators.required]],
    });
  }

  volver(): void {
    this.router.navigate(['/components/moneda']);
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

    const moneda: Moneda = {
      tipo_moneda: this.form.value.tipo_moneda,
      estado: this.form.value.estado,
    };

    this.monedaService.insert(moneda).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Moneda registrada correctamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          background: '#1E293B',
          color: '#ffff',
        });
        this.router.navigate(['/components/moneda']);
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
