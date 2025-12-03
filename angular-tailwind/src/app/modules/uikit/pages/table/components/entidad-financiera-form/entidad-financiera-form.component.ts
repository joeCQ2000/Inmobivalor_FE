import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntidadFinanciera } from 'src/app/core/models/entidad-financiera.model';
import { EntidadFinancieraService } from 'src/app/core/services/entidad-financiera.service';

@Component({
  selector: 'app-entidad-financiera-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entidad-financiera-form.component.html',
  styleUrls: ['./entidad-financiera-form.component.css'],
})
export class EntidadFinancieraFormComponent implements OnInit {
  @Input() entidad?: EntidadFinanciera;


  @Output() saved = new EventEmitter<EntidadFinanciera>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private entidadService: EntidadFinancieraService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id_entidad: [this.entidad?.id_entidad],
      nombre: [this.entidad?.nombre || '', Validators.required],
      ruc: [this.entidad?.ruc || '', Validators.required],
      direccion: [this.entidad?.direccion || '', Validators.required],
      telefono: [this.entidad?.telefono || '', Validators.required],
      correo: [this.entidad?.correo || '', Validators.required],
      estado: [this.entidad?.estado ?? true],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const data: EntidadFinanciera = {
      ...this.entidad, 
      ...this.form.value,
    };

    this.entidadService.update(data).subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit(data);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
