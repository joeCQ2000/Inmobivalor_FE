import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EntidadTasa } from 'src/app/core/models/entidad-tasa.model';
import { EntidadTasaService } from 'src/app/core/services/entidad-tasa.service';

type SortField = 'id' | 'entidad' | 'tipoTasa' | 'tasaPct';
type RangoTasa = 'todos' | 'baja' | 'media' | 'alta';

@Component({
  selector: 'app-entidad-tasa-table',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './entidad-tasa-table.component.html',
  styleUrls: ['./entidad-tasa-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntidadTasaTableComponent implements OnInit {

  entidadTasaList = signal<EntidadTasa[]>([]);


  loading = signal(false);
  errorMessage = signal('');
  isInitialLoad = signal(true);


  sortField = signal<SortField | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');


  paginaActual = signal(1);
  tamanioPagina = signal(10);


  searchGeneral = signal('');
  filterEntidad = signal('');
  filterTipoTasa = signal('');
  filterRangoTasa = signal<RangoTasa>('todos');


  filterEntidadTasa = computed(() => {
    const search = this.searchGeneral().toLowerCase().trim();
    const entidad = this.filterEntidad().toLowerCase().trim();
    const tipo = this.filterTipoTasa().toLowerCase().trim();
    const rango = this.filterRangoTasa();

    return this.entidadTasaList().filter((et) => {
      const entidadNombre = (et.entidad?.nombre ?? '').toLowerCase();
      const tipoTasa = (et.tasa?.tipo_tasa ?? '').toLowerCase();
      const tasaPct = (et.tasa?.tasa_pct ?? 0) * 100;

      const matchesGeneral =
        !search ||
        entidadNombre.includes(search) ||
        tipoTasa.includes(search) ||
        tasaPct.toString().includes(search);

      const matchesEntidad = !entidad || entidadNombre.includes(entidad);
      const matchesTipo = !tipo || tipoTasa.includes(tipo);

      const matchesRango =
        rango === 'todos' ||
        (rango === 'baja' && tasaPct < 8) ||
        (rango === 'media' && tasaPct >= 8 && tasaPct <= 12) ||
        (rango === 'alta' && tasaPct > 12);

      return (
        matchesGeneral &&
        matchesEntidad &&
        matchesTipo &&
        matchesRango
      );
    });
  });


  sortedEntidadTasa = computed(() => {
    const data = [...this.filterEntidadTasa()];
    const field = this.sortField();
    const direction = this.sortDirection();
    const factor = direction === 'asc' ? 1 : -1;

    if (!field) return data;

    return data.sort((a, b) => {
      switch (field) {
        case 'id': {
          const aVal = a.id_entidad_tasa ?? 0;
          const bVal = b.id_entidad_tasa ?? 0;
          return (aVal - bVal) * factor;
        }
        case 'entidad': {
          const aVal = a.entidad?.nombre ?? '';
          const bVal = b.entidad?.nombre ?? '';
          return (
            aVal.localeCompare(bVal, 'es', { sensitivity: 'base' }) * factor
          );
        }
        case 'tipoTasa': {
          const aVal = a.tasa?.tipo_tasa ?? '';
          const bVal = b.tasa?.tipo_tasa ?? '';
          return (
            aVal.localeCompare(bVal, 'es', { sensitivity: 'base' }) * factor
          );
        }
        case 'tasaPct': {
          const aVal = a.tasa?.tasa_pct ?? 0;
          const bVal = b.tasa?.tasa_pct ?? 0;
          if (aVal < bVal) return -1 * factor;
          if (aVal > bVal) return 1 * factor;
          return 0;
        }
        default:
          return 0;
      }
    });
  });

  totalRegistros = computed(() => this.sortedEntidadTasa().length);

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

  paginadoEntidadTasa = computed(() => {
    const start = (this.paginaActual() - 1) * this.tamanioPagina();
    const end = start + this.tamanioPagina();
    return this.sortedEntidadTasa().slice(start, end);
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

  constructor(private entidadTasaService: EntidadTasaService) {}

  ngOnInit(): void {
    this.obtenerEntidadTasas();
  }

  obtenerEntidadTasas(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.isInitialLoad.set(true);

    this.entidadTasaService.list().subscribe({
      next: (data) => {
        this.entidadTasaList.set(data);
        this.loading.set(false);
        this.isInitialLoad.set(false);
        this.paginaActual.set(1);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set(
          'Ocurrió un error al cargar los registros Entidad - Tasa.'
        );
        this.loading.set(false);
        this.isInitialLoad.set(false);
      },
    });
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

  onEntidadChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.filterEntidad.set(value);
    this.paginaActual.set(1);
  }

  onTipoTasaChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.filterTipoTasa.set(value);
    this.paginaActual.set(1);
  }

  onRangoTasaChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as RangoTasa;
    this.filterRangoTasa.set(value);
    this.paginaActual.set(1);
  }

  onSearch(
    entidadInput: HTMLInputElement,
    tipoTasaInput: HTMLInputElement,
    rangoSelect: HTMLSelectElement
  ): void {
    this.filterEntidad.set(entidadInput.value ?? '');
    this.filterTipoTasa.set(tipoTasaInput.value ?? '');
    this.filterRangoTasa.set(
      (rangoSelect.value || 'todos') as RangoTasa
    );
    this.paginaActual.set(1);
  }

  resetFilters(
    searchInput: HTMLInputElement,
    entidadInput: HTMLInputElement,
    tipoTasaInput: HTMLInputElement,
    rangoSelect: HTMLSelectElement
  ): void {
    searchInput.value = '';
    entidadInput.value = '';
    tipoTasaInput.value = '';
    rangoSelect.value = 'todos';

    this.searchGeneral.set('');
    this.filterEntidad.set('');
    this.filterTipoTasa.set('');
    this.filterRangoTasa.set('todos');
    this.paginaActual.set(1);
  }
}
