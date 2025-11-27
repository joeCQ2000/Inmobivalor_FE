import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasaInteresService } from 'src/app/core/services/tasa-interes.service';
import { TasaInteres } from 'src/app/core/models/tasa-interes.model';

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
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private tasaInteresService: TasaInteresService
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

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
        this.successMessage = 'Tasa de interés registrada correctamente.';
        this.form.reset({
          tipo_tasa: '',
          tasa_pct: '',
          estado: true,
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage =
          'Ocurrió un error al registrar la tasa de interés. Revisa la consola.';
      },
    });
  }

  controlInvalid(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
