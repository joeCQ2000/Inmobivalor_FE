import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImagineService } from 'src/app/modules/layout/services/imagine.service';
import { InmobiliariaService } from 'src/app/modules/layout/services/inmobiliaria.service';

@Component({
  selector: 'app-inmobiliaria',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inmobiliaria.component.html',
  styleUrl: './inmobiliaria.component.css',
})
export class InmobiliariaComponent implements OnInit {
  inmobiliariaForm!: FormGroup;
  imageId: number | null = null; // Para almacenar el ID de la imagen
  cargando = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private inmobiliariaService: InmobiliariaService,
    private imagenService: ImagineService,
  ) {}

  ngOnInit(): void {
    this.inmobiliariaForm = this.fb.group({
      ubicacion: ['', Validators.required],
      area: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      situacion_inmobiliaria: ['', Validators.required],
      estado: [true, Validators.required],
    });
  }

  onImageSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      this.imagenService.uploadImages([file]).subscribe(
        (response) => {
          // Asumimos que la respuesta contiene el ID de la imagen
          this.imageId = response[0].id;
          console.log('ID de la imagen:', this.imageId);
        },
        (error) => {
          console.error('Error al subir la imagen', error);
        },
      );
    }
  }

  // Registrar la propiedad inmobiliaria con la imagen asociada
  registrarInmobiliaria(): void {
    if (this.imageId) {
      const inmobiliaria = { ...this.inmobiliariaForm.value, imagen: this.imageId };
      this.cargando = true;
      this.inmobiliariaService.registrarInmobiliaria(inmobiliaria).subscribe(
        (response) => {
          this.cargando = false;
          console.log('Propiedad registrada con éxito', response);
        },
        (error) => {
          this.cargando = false;
          this.error = 'Error al registrar la propiedad.';
        },
      );
    } else {
      this.error = 'Debe cargar una imagen primero.';
    }
  }

  limpiar(): void {
    this.inmobiliariaForm.reset();
    this.imageId = null;
  }
}
