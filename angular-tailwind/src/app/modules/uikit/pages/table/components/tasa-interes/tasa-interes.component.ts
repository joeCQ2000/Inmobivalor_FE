import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasaInteresService } from 'src/app/core/services/tasa-interes.service';
import { TasaInteres } from 'src/app/core/models/tasa-interes.model';
import { TasaInteresFilterService } from './services/tasa-interes-filter.service';
import { TasaInteresActionComponent } from './components/tasa-interes-action/tasa-interes-action.component';
import { TableFooterComponent } from '../../../table copy/components/table-footer/table-footer.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-tasa-interes',
  standalone: true,
  imports: [
    CommonModule,
    TasaInteresActionComponent,
    TableFooterComponent,
    AngularSvgIconModule
  ],
  templateUrl: './tasa-interes.component.html',
  styleUrls: ['./tasa-interes.component.css']
})
export class TasaInteresComponent implements OnInit {

  tasas = signal<TasaInteres[]>([]);
  paginas = signal(1);
  tamanioPagina = signal(10);
  loading = false;
  errorMessage = '';

  totalpaginas = computed(() => {
    const totalItems = this.filterTasas().length;
    return Math.ceil(totalItems / this.tamanioPagina());
  });

  constructor(
    private tasaInteresService: TasaInteresService,
    public filterService: TasaInteresFilterService
  ) {}

  ngOnInit(): void {
    this.obtenerTasas();
  }

  obtenerTasas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.tasaInteresService.list().subscribe({
      next: (data) => {
        this.tasas.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar las tasas de interés.';
        this.loading = false;
      }
    });
  }

  filterTasas = computed(() => {
    const search = this.filterService.searchField().toLowerCase();
    const tipoTasa = this.filterService.tipoTasa().toLowerCase();
    const estado = this.filterService.estadoField();

    return this.tasas().filter(item => {
      const matchesSearch =
        item.tipo_tasa?.toLowerCase().includes(search) ||
        item.tasa_pct?.toString().includes(search);
      const matchesTipoTasa = tipoTasa === '' || item.tipo_tasa?.toLowerCase().includes(tipoTasa);
      const matchesEstado = estado === 0 || 
        (estado === 1 && item.estado === true) || 
        (estado === 2 && item.estado === false);

      return matchesSearch && matchesTipoTasa && matchesEstado;
    });
  });

  paginadoTasas = computed(() => {
    const empiezo = (this.paginas() - 1) * this.tamanioPagina();
    const final = empiezo + this.tamanioPagina();
    return this.filterTasas().slice(empiezo, final);
  });

  eliminarTasa(id: number): void {
    if (confirm('¿Está seguro de eliminar esta tasa de interés?')) {
      this.tasaInteresService.delete(id).subscribe({
        next: () => {
          this.obtenerTasas();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la tasa de interés');
        }
      });
    }
  }
}
