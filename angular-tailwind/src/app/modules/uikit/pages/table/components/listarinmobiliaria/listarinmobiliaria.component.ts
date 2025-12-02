import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagineService } from 'src/app/modules/layout/services/imagine.service';
import { InmobiliariaService } from 'src/app/modules/layout/services/inmobiliaria.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-listarinmobiliaria',
  imports: [CommonModule, FormsModule],
  templateUrl: './listarinmobiliaria.component.html',
  styleUrl: './listarinmobiliaria.component.css',
})
export class ListarinmobiliariaComponent implements OnInit {
    inmobiliarias: any[] = [];
  pagedInmobiliarias: any[] = [];

  // estados
  loading: boolean = false;
  errorMessage: string = '';

  // paginación
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10; // tamaño inicial como en el ejemplo
  pageSizeOptions: number[] = [5, 10, 20, 30, 50];

  // imágenes
  imagenes: { [key: number]: string } = {};

  // Filtros de búsqueda
  searchEstado: string = ''; // '', 'true', 'false'
  searchSituacion: string = '';
  searchUbicacion: string = '';

  // Modal detalle
  showDetalleModal: boolean = false;
  selectedInmobiliaria: any = null;
  loadingDetalle: boolean = false;
  detalleImageUrl: string | null = null;

  constructor(
    private inmobiliariaService: InmobiliariaService,
    private imagenService: ImagineService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadInmobiliarias();
  }

  // ==============================
  // CARGA PRINCIPAL
  // ==============================
  loadInmobiliarias(): void {
    this.loading = true;
    this.errorMessage = '';

    this.inmobiliariaService.listarInmobiliarias().subscribe({
      next: (data) => {
        this.inmobiliarias = data || [];
        this.totalItems = this.inmobiliarias.length;
        this.currentPage = 1;
        this.setPagedInmobiliarias();
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          'Ocurrió un error al cargar la lista de inmobiliarias.';
        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // DETALLE (MODAL)
  // ==============================
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

        const imageId = data.imagen || data.idImagen || data.imageId;
        if (imageId != null) {
          this.detalleImageUrl = this.imagenService.getImageUrl(imageId);
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener detalle de inmobiliaria', err);
        this.loadingDetalle = false;

        this.cdr.detectChanges();
      },
    });
  }

  cerrarDetalleModal(): void {
    this.showDetalleModal = false;
    this.selectedInmobiliaria = null;
    this.detalleImageUrl = null;
  }

  // ==============================
  // PAGINACIÓN (formato ejemplo)
  // ==============================
  private setPagedInmobiliarias(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedInmobiliarias = this.inmobiliarias.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    if (this.totalItems === 0) {
      return 1;
    }
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get inicio(): number {
    if (this.totalItems === 0) {
      return 0;
    }
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get fin(): number {
    if (this.totalItems === 0) {
      return 0;
    }
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  get paginasVisibles(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const max = 5;

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + max - 1);

    if (end - start + 1 < max) {
      start = Math.max(1, end - max + 1);
    }

    const res: number[] = [];
    for (let i = start; i <= end; i++) {
      res.push(i);
    }
    return res;
  }

  get showEllipsis(): boolean {
    const pages = this.paginasVisibles;
    return pages.length > 0 && pages[pages.length - 1] < this.totalPages;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.setPagedInmobiliarias();
  }

  irPagina(num: number): void {
    this.onPageChange(num);
  }

  irPaginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedInmobiliarias();
    }
  }

  irPaginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPagedInmobiliarias();
    }
  }

  onPageSizeChange(value: number): void {
    if (!value) return;
    this.pageSize = value;
    this.currentPage = 1;
    this.setPagedInmobiliarias();
  }

  // ==============================
  // ACCIONES
  // ==============================
  editarInmobiliaria(inmobiliaria: any): void {
    const id =
      inmobiliaria.idInmobiliaria ||
      inmobiliaria.id_inmobiliaria ||
      inmobiliaria.id;
    console.log('Editar inmobiliaria con ID:', id);
    this.router.navigate(['../editarinmobiliaria', id], {
      relativeTo: this.route,
    });
  }

  limpiarFiltros(): void {
    this.searchEstado = '';
    this.searchSituacion = '';
    this.searchUbicacion = '';
    this.loadInmobiliarias();
  }

  registrarInmobiliaria(): void {
    this.router.navigate(['../inmobiliaria'], { relativeTo: this.route });
  }

  volver(): void {
    this.location.back();
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

    this.loading = true;
    this.errorMessage = '';

    this.inmobiliariaService.buscarInmobiliarias(filtro).subscribe({
      next: (data) => {
        this.inmobiliarias = data || [];
        this.totalItems = this.inmobiliarias.length;
        this.currentPage = 1;
        this.setPagedInmobiliarias();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          'Ocurrió un error al buscar inmobiliarias con los filtros.';
        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }
}
