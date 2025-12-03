import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';

import { TableActionComponent } from './components/table-action/table-action.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableFilterService } from './services/table-filter.service';

import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    FormsModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableActionComponent,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableClienteComponent implements OnInit {
  // lista completa
  cliente = signal<Cliente[]>([]);

  // paginación
  paginas = signal(1);
  tamanioPagina = signal(10);

  constructor(
    private httpClient: HttpClient,
    private filterService: TableFilterService,
    private router: Router,
    private clienteservice: ClienteService
  ) {}

  ngOnInit(): void {
    this.clienteservice.list().subscribe({
      next: (data) => {
        this.cliente.set(data);
      },
      error: (error) => {
        this.handleRequestError(error);
      },
    });
  }

  goToRegistro(): void {
    this.router.navigate(['/components/registraeditacliente']);
  }

  private handleRequestError(error: any) {
    const msg =
      'An error occurred while fetching users. Loading dummy data as fallback.';
    toast.error(msg, {
      position: 'bottom-right',
      description: error.message,
      action: {
        label: 'Undo',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-foreground-color; color:white;',
    });
  }


  filtercliente = computed(() => {
    const search        = this.filterService.searchField().toLowerCase();
    const nombresFilter = this.filterService.nombres().toLowerCase();
    const dniFilter     = this.filterService.dni().toLowerCase();
    const esActivoFilter = this.filterService.es_activo(); 

    return this.cliente().filter((item) => {
      const nombreItem = (item.nombres ?? '').toLowerCase();
      const correoItem = (item.correo ?? '').toLowerCase();
      const dniItem    = (item.dni ?? '').toLowerCase();

      const matchesSearch =
        !search ||
        nombreItem.includes(search) ||
        correoItem.includes(search);


      const matchesNombre =
        !nombresFilter || nombreItem.includes(nombresFilter);


      const matchesDni =
        !dniFilter || dniItem.includes(dniFilter);

      const itemActivo = Boolean(item.es_activo); 


      const matchesEstado =
        esActivoFilter === null ? true : itemActivo === esActivoFilter;

      return (
        matchesSearch &&
        matchesNombre &&
        matchesDni &&
        matchesEstado
      );
    });
  });

  totalpaginas = computed(() => {
    const totalItems = this.filtercliente().length;
    return Math.max(1, Math.ceil(totalItems / this.tamanioPagina()));
  });

  paginadoCliente = computed(() => {
    const start = (this.paginas() - 1) * this.tamanioPagina();
    const end = start + this.tamanioPagina();
    return this.filtercliente().slice(start, end);
  });

  toggleMuestreo(checked: boolean) {
    console.log('Checkbox del header marcado', checked);
  }
}
