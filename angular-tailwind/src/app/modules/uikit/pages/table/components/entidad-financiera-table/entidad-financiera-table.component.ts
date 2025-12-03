import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EntidadFinanciera } from 'src/app/core/models/entidad-financiera.model';
import { EntidadFinancieraService } from 'src/app/core/services/entidad-financiera.service';
import { EntidadFinancieraFormComponent } from '../entidad-financiera-form/entidad-financiera-form.component';

type SortField =
  | 'id_entidad'
  | 'nombre'
  | 'ruc'
  | 'direccion'
  | 'telefono'
  | 'correo'
  | 'estado';

@Component({
  selector: 'app-entidad-financiera-table',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, EntidadFinancieraFormComponent],
  templateUrl: './entidad-financiera-table.component.html',
  styleUrls: ['./entidad-financiera-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntidadFinancieraTableComponent implements OnInit {

  entidades = signal<EntidadFinanciera[]>([]);
  loading = signal(false);
  isInitialLoad = signal(true);
  errorMessage = signal('');

  selectedEntidad = signal<EntidadFinanciera | null>(null);
  showForm = signal(false);


  sortField = signal<SortField | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');


  paginaActual = signal(1);
  tamanioPagina = signal(10);

  searchGeneral = signal('');
  filterNombre = signal('');
  filterRuc = signal('');
  filterEstado = signal<'todos' | 'activos' | 'inactivos'>('todos');


  filterEntidades = computed(() => {
    const search = this.searchGeneral().toLowerCase().trim();
    const nombre = this.filterNombre().toLowerCase().trim();
    const ruc = this.filterRuc().toLowerCase().trim();
    const estadoFilter = this.filterEstado();

    return this.entidades().filter((e) => {
      const nombreEnt = (e.nombre ?? '').toLowerCase();
      const rucEnt = (e.ruc ?? '').toString().toLowerCase();
      const correoEnt = (e.correo ?? '').toLowerCase();

      const matchesGeneral =
        !search ||
        nombreEnt.includes(search) ||
        rucEnt.includes(search) ||
        correoEnt.includes(search);

      const matchesNombre = !nombre || nombreEnt.includes(nombre);
      const matchesRuc = !ruc || rucEnt.includes(ruc);

      const matchesEstado =
        estadoFilter === 'todos' ||
        (estadoFilter === 'activos' && !!e.estado) ||
        (estadoFilter === 'inactivos' && !e.estado);

      return matchesGeneral && matchesNombre && matchesRuc && matchesEstado;
    });
  });


  sortedEntidades = computed(() => {
    const data = [...this.filterEntidades()];
    const field = this.sortField();
    const direction = this.sortDirection();

    if (!field) return data;

    const factor = direction === 'asc' ? 1 : -1;

    return data.sort((a, b) => {
      const aVal = (a as any)[field];
      const bVal = (b as any)[field];


      if (field === 'id_entidad' || field === 'estado') {
        const aNum = Number(aVal ?? 0);
        const bNum = Number(bVal ?? 0);
        if (aNum < bNum) return -1 * factor;
        if (aNum > bNum) return 1 * factor;
        return 0;
      }

 
      const aStr = (aVal ?? '').toString();
      const bStr = (bVal ?? '').toString();
      return aStr.localeCompare(bStr, 'es', { sensitivity: 'base' }) * factor;
    });
  });

  totalRegistros = computed(() => this.sortedEntidades().length);

  totalPaginas = computed(() => {
    const total = this.totalRegistros();
    return total === 0 ? 1 : Math.ceil(total / this.tamanioPagina());
  });

  inicio = computed(() => {
    const total = this.totalRegistros();
    if (total === 0) return 0;
    return (this.paginaActual() - 1) * this.tamanioPagina() + 1;
  });

  fin = computed(() => {
    const total = this.totalRegistros();
    if (total === 0) return 0;
    const end = this.paginaActual() * this.tamanioPagina();
    return end > total ? total : end;
  });

  paginadoEntidades = computed(() => {
    const start = (this.paginaActual() - 1) * this.tamanioPagina();
    const end = start + this.tamanioPagina();
    return this.sortedEntidades().slice(start, end);
  });

  paginasVisibles = computed(() => {
    const total = this.totalPaginas();
    const current = this.paginaActual();
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
  });

  showEllipsis = computed(() => {
    const pages = this.paginasVisibles();
    return pages.length > 0 && pages[pages.length - 1] < this.totalPaginas();
  });

  constructor(private entidadService: EntidadFinancieraService) {}

  ngOnInit(): void {
    this.obtenerEntidades(true);
  }

  obtenerEntidades(showLoadingMessage: boolean): void {
    if (showLoadingMessage) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.isInitialLoad.set(true);
    }

    this.entidadService.list().subscribe({
      next: (data) => {
        this.entidades.set(data);
        this.paginaActual.set(1);

        if (showLoadingMessage) {
          this.loading.set(false);
          this.isInitialLoad.set(false);
        }
      },
      error: (err) => {
        console.error(err);
        if (showLoadingMessage) {
          this.errorMessage.set(
            'Ocurrió un error al cargar las entidades financieras.'
          );
          this.loading.set(false);
          this.isInitialLoad.set(false);
        }
      },
    });
  }


  onEditEntidad(entidad: EntidadFinanciera): void {
    this.selectedEntidad.set({ ...entidad });
    this.showForm.set(true);
  }

  onFormSaved(_?: EntidadFinanciera): void {
    this.showForm.set(false);
    this.selectedEntidad.set(null);
    this.obtenerEntidades(false);
  }

  onFormCancelled(): void {
    this.showForm.set(false);
    this.selectedEntidad.set(null);
  }


  ordenarPor(field: SortField): void {
    if (this.sortField() === field) {

      this.sortDirection.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {

      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
    this.paginaActual.set(1); 
  }


  onTamanioChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (!value) return;
    this.tamanioPagina.set(value);
    this.paginaActual.set(1);
  }

  irPagina(num: number): void {
    if (num < 1 || num > this.totalPaginas()) return;
    this.paginaActual.set(num);
  }

  irPaginaAnterior(): void {
    if (this.paginaActual() > 1) {
      this.paginaActual.update((p) => p - 1);
    }
  }

  irPaginaSiguiente(): void {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.update((p) => p + 1);
    }
  }


  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.searchGeneral.set(value);
    this.paginaActual.set(1);
  }

  onNombreChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.filterNombre.set(value);
    this.paginaActual.set(1);
  }

  onRucChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.filterRuc.set(value);
    this.paginaActual.set(1);
  }

  onEstadoChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as
      | 'todos'
      | 'activos'
      | 'inactivos';
    this.filterEstado.set(value);
    this.paginaActual.set(1);
  }

  onSearch(
    nombreInput: HTMLInputElement,
    rucInput: HTMLInputElement,
    estadoSelect: HTMLSelectElement
  ): void {
    this.filterNombre.set(nombreInput.value ?? '');
    this.filterRuc.set(rucInput.value ?? '');
    this.filterEstado.set(
      (estadoSelect.value || 'todos') as 'todos' | 'activos' | 'inactivos'
    );
    this.paginaActual.set(1);
  }

  resetFilters(
    searchInput: HTMLInputElement,
    nombreInput: HTMLInputElement,
    rucInput: HTMLInputElement,
    estadoSelect: HTMLSelectElement
  ): void {
    searchInput.value = '';
    nombreInput.value = '';
    rucInput.value = '';
    estadoSelect.value = 'todos';

    this.searchGeneral.set('');
    this.filterNombre.set('');
    this.filterRuc.set('');
    this.filterEstado.set('todos');
    this.paginaActual.set(1);
  }
}
