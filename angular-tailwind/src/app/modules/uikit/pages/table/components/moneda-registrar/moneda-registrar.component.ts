import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MonedaService } from 'src/app/core/services/moneda.service';
import { Moneda } from 'src/app/core/models/moneda.model';

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
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private monedaService: MonedaService
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

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
        this.successMessage = 'Moneda registrada correctamente.';
        this.form.reset({
          tipo_moneda: '',
          estado: true,
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage =
          'Ocurrió un error al registrar la moneda. Revisa la consola.';
      },
    });
  }

  controlInvalid(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
