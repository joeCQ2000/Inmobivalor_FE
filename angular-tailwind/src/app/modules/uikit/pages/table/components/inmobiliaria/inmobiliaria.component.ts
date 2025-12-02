import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  modoEdicion = false;
  idInmobiliaria: number | null = null;
  constructor(
    private fb: FormBuilder,
    private inmobiliariaService: InmobiliariaService,
    private imagenService: ImagineService,
    private route: ActivatedRoute,
    private router: Router,
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

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.modoEdicion = true;
      this.idInmobiliaria = Number(idParam);
      this.cargarInmobiliaria(this.idInmobiliaria)
    }
  }

  cargarInmobiliaria(id: number): void {
    this.inmobiliariaService.obtenerInmobiliariaPorId(id).subscribe(
      (data) => {
        // Ajusta si tus nombres cambian en el DTO
        this.inmobiliariaForm.patchValue({
          ubicacion: data.ubicacion,
          area: data.area,
          precio: data.precio,
          descripcion: data.descripcion,
          situacion_inmobiliaria: data.situacion_inmobiliaria,
          estado: data.estado, // debe venir como boolean
        });

        // Si el DTO trae la imagen (id)
        if (data.imagen) {
          this.imageId = data.imagen;
        }
      },
      (error) => {
        console.error('Error al cargar la inmobiliaria', error);
        this.error = 'No se pudo cargar la propiedad.';
      }
    );
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

  guardarInmobiliaria(): void {
    if (!this.imageId) {
      this.error = 'Debe cargar una imagen primero.';
      return;
    }

    if (this.inmobiliariaForm.invalid) {
      this.error = 'Revise los campos del formulario.';
      return;
    }

    const payload: any = {
      ...this.inmobiliariaForm.value,
      imagen: this.imageId,
    };

    // Si estamos editando, enviamos también el id de la inmobiliaria
    if (this.modoEdicion && this.idInmobiliaria != null) {
      // ajusta el nombre del campo según tu DTO (idInmobiliaria / id_inmobiliaria / id)
      payload.idInmobiliaria = this.idInmobiliaria;
    }

    this.cargando = true;
    this.error = null;

    const peticion = this.modoEdicion
      ? this.inmobiliariaService.actualizarInmobiliaria(payload)
      : this.inmobiliariaService.registrarInmobiliaria(payload);

    peticion.subscribe(
      (response) => {
        this.cargando = false;
        console.log(
          this.modoEdicion
            ? 'Propiedad actualizada con éxito'
            : 'Propiedad registrada con éxito',
          response
        );
        // Opcional: redirigir a la lista
        // this.router.navigate(['/ruta-de-lista-inmobiliarias']);
      },
      (error) => {
        this.cargando = false;
        console.error(error);
        this.error = this.modoEdicion
          ? 'Error al actualizar la propiedad.'
          : 'Error al registrar la propiedad.';
      }
    );
  }
  limpiar(): void {
    this.inmobiliariaForm.reset();
    this.imageId = null;
  }
}
