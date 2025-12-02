import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagineService } from 'src/app/modules/layout/services/imagine.service';
import { InmobiliariaService } from 'src/app/modules/layout/services/inmobiliaria.service';

@Component({
  selector: 'app-listarinmobiliaria',
  imports: [CommonModule, FormsModule],
  templateUrl: './listarinmobiliaria.component.html',
  styleUrl: './listarinmobiliaria.component.css',
})
export class ListarinmobiliariaComponent implements OnInit {
  inmobiliarias: any[] = [];
  pagedInmobiliarias: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  imagenes: { [key: number]: string } = {};
  // Filtros de búsqueda
  searchEstado: string = ''; // '', 'true', 'false'
  searchSituacion: string = '';
  searchUbicacion: string = '';

  showDetalleModal: boolean = false;
  selectedInmobiliaria: any = null;
  loadingDetalle: boolean = false;
  detalleImageUrl: string | null = null;

  constructor(
    private inmobiliariaService: InmobiliariaService,
    private imagenService: ImagineService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadInmobiliarias();
  }

  loadInmobiliarias(): void {
    this.inmobiliariaService.listarInmobiliarias().subscribe((data) => {
      this.inmobiliarias = data;
      this.totalItems = data.length;
      this.setPagedInmobiliarias();
    });
  }
verInmobiliaria(inmobiliaria: any): void {
  const id =
    inmobiliaria.idInmobiliaria ||
    inmobiliaria.id_inmobiliaria ||
    inmobiliaria.id;

  if (!id) {
    console.error('La inmobiliaria no tiene ID válido', inmobiliaria);
    return;
  }

  this.showDetalleModal = true;
  this.loadingDetalle = true;
  this.selectedInmobiliaria = null;
  this.detalleImageUrl = null;

  this.inmobiliariaService.obtenerInmobiliariaPorId(id).subscribe({
    next: (data) => {
      this.selectedInmobiliaria = data;
      this.loadingDetalle = false;

      // Aquí asumimos que el backend devuelve el id de imagen en alguna de estas propiedades
      const imageId =
        data.imagen ||
        data.idImagen ||
        data.imageId;

      if (imageId != null) {
        this.detalleImageUrl = this.imagenService.getImageUrl(imageId);
      }

      this.cdr.markForCheck?.();
    },
    error: (err) => {
      console.error('Error al obtener detalle de inmobiliaria', err);
      this.loadingDetalle = false;
    },
  });
}


cerrarDetalleModal(): void {
  this.showDetalleModal = false;
  this.selectedInmobiliaria = null;
  this.detalleImageUrl = null;
}

  // Establecer las inmobiliarias de la página actual
  setPagedInmobiliarias(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedInmobiliarias = this.inmobiliarias.slice(startIndex, endIndex); // Cortamos los datos para la página actual
  }

  // Cargar las imágenes de cada inmobiliaria

  // Cambiar de página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.setPagedInmobiliarias(); // Actualizamos los datos para la nueva página
    // Cargamos las imágenes para la nueva página
  }

  // Método para editar la inmobiliaria (puedes redirigir al formulario de edición)
  editarInmobiliaria(inmobiliaria: any): void {
    const id = inmobiliaria.idInmobiliaria || inmobiliaria.id_inmobiliaria || inmobiliaria.id;
    console.log('Editar inmobiliaria con ID:', id);
    this.router.navigate(
      ['../editarinmobiliaria', id], // sube un nivel y entra a editarinmobiliaria/:id
      { relativeTo: this.route }, // relativo a la ruta actual (Listarinmobiliaria)
    );
  }

  limpiarFiltros(): void {
    this.searchEstado = '';
    this.searchSituacion = '';
    this.searchUbicacion = '';
    this.loadInmobiliarias();
  }

  registrarInmobiliaria(): void {
    // navega al hijo hermano 'registraeditausuario'
    this.router.navigate(['../inmobiliaria'], { relativeTo: this.route });
  }

  buscarInmobiliarias(): void {
    const filtro: any = {};

    if (this.searchEstado === 'true' || this.searchEstado === 'false') {
      filtro.estado = this.searchEstado === 'true';
    }

    if (this.searchSituacion && this.searchSituacion.trim() !== '') {
      filtro.situacion_inmobiliaria = this.searchSituacion.trim();
    }

    if (this.searchUbicacion && this.searchUbicacion.trim() !== '') {
      filtro.ubicacion = this.searchUbicacion.trim();
    }

    this.inmobiliariaService.buscarInmobiliarias(filtro).subscribe((data) => {
      this.inmobiliarias = data;
      this.totalItems = data.length;
      this.currentPage = 1;
      this.setPagedInmobiliarias();
    });
  }
}
