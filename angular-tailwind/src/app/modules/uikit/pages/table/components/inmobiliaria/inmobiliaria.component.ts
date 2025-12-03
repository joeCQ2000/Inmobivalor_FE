import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagineService } from 'src/app/modules/layout/services/imagine.service';
import { InmobiliariaService } from 'src/app/modules/layout/services/inmobiliaria.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inmobiliaria',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inmobiliaria.component.html',
  styleUrl: './inmobiliaria.component.css',
})
export class InmobiliariaComponent implements OnInit {
  inmobiliariaForm!: FormGroup;
  imageId: number | null = null;
  cargando = false;
  error: string | null = null;
  submitted = false;
  modoEdicion = false;
  idInmobiliaria: number | null = null;

  constructor(
    private fb: FormBuilder,
    private inmobiliariaService: InmobiliariaService,
    private imagenService: ImagineService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
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
    if (idParam) {
      this.modoEdicion = true;
      this.idInmobiliaria = Number(idParam);
      this.cargarInmobiliaria(this.idInmobiliaria);
    }
  }

  cargarInmobiliaria(id: number): void {
    this.inmobiliariaService.obtenerInmobiliariaPorId(id).subscribe({
      next: (data) => {
        this.inmobiliariaForm.patchValue({
          ubicacion: data.ubicacion,
          area: data.area,
          precio: data.precio,
          descripcion: data.descripcion,
          situacion_inmobiliaria: data.situacion_inmobiliaria,
          estado: data.estado,
        });

        if (data.imagen) {
          this.imageId = data.imagen;
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la propiedad.';
        this.cdr.detectChanges();
      },
    });
  }

  onImageSelected(event: any): void {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files[0];

    this.imagenService.uploadImages([file]).subscribe({
      next: (response) => {
        this.imageId = response[0].id;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al subir la imagen.';
        this.cdr.detectChanges();
      },
    });
  }

  guardarInmobiliaria(): void {
    this.submitted = true;

    // Validación de campos requeridos
    if (this.inmobiliariaForm.invalid) {
      this.inmobiliariaForm.markAllAsTouched();

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

    // ---- VALIDACIÓN OPCIONAL DE IMAGEN ----
    if (!this.imageId) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe cargar una imagen (opcional, pero recomendada)',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2500,
        background: '#1E293B',
        color: '#ffff',
      });
      // la imagen sigue siendo opcional
    }

    const values = this.inmobiliariaForm.getRawValue();

    const payload: any = {
      ubicacion: values.ubicacion,
      area: values.area,
      precio: values.precio,
      descripcion: values.descripcion,
      situacion_inmobiliaria: values.situacion_inmobiliaria,
      estado: values.estado,
      imagen: this.imageId ? this.imageId : null,
    };

    if (this.modoEdicion && this.idInmobiliaria) {
      payload.idInmobiliaria = this.idInmobiliaria;
    }

    this.cargando = true;

    const peticion = this.modoEdicion
      ? this.inmobiliariaService.actualizarInmobiliaria(payload)
      : this.inmobiliariaService.registrarInmobiliaria(payload);

    peticion.subscribe({
      next: (resp) => {
        this.cargando = false;

        Swal.fire({
          icon: 'success',
          title: this.modoEdicion ? 'Inmobiliaria actualizada correctamente' : 'Inmobiliaria registrada correctamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          background: '#1E293B',
          color: '#ffff',
        });

        this.router.navigate(['../Listarinmobiliaria'], { relativeTo: this.route });
      },
      error: (err) => {
        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title: this.modoEdicion ? 'Ocurrió un error al actualizar' : 'Ocurrió un error al registrar',
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
  limpiar(): void {
    this.inmobiliariaForm.reset();
    this.imageId = null;
  }

  volver(): void {
    this.router.navigate(['components/Listarinmobiliaria']);
  }
}
