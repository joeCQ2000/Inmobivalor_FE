import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { User } from './model/user.model';
import { TableFilterService } from './services/table-filter.service';
import { usuario } from '../../../../core/models/usuario.model';
import { CreditoPrestamo } from 'src/app/core/models/credito-prestamo.model';
import { Router } from '@angular/router';
import { CreditoPrestamoService } from 'src/app/core/services/credito-prestamo.service';

@Component({
  selector: 'app-table',
  imports: [
    AngularSvgIconModule,
    FormsModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableActionComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TablePrestamoComponent implements OnInit {
  prestamo = signal<CreditoPrestamo[]>([]);
  paginas = signal(1);
  tamanioPagina = signal (10);

  totalpaginas = computed(()=>{
    const totalItems = this.filterprestamo().length;
    return Math.ceil(totalItems / this.tamanioPagina())
  })
  constructor(private httpClient: HttpClient, private filterService: TableFilterService, private router: Router, private creditoprestamoservice : CreditoPrestamoService) {
    this.creditoprestamoservice.list().subscribe({
      next: (data) => {
    this.prestamo.set(
  data
);
  },
      error: (error) => {
        this.handleRequestError(error);
      },
    });
  }
 goToRegistro(): void {
  this.router.navigate(['/components/registraeditausuario']);
}
  private handleRequestError(error: any) {
    const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
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
filterprestamo = computed(() => {
  const search   = this.filterService.searchField().toLowerCase();
  const cliente = this.filterService.cliente().toLowerCase();
  const inmobiliaria      = this.filterService.inmobiliaria().toLowerCase();
  const estado   = this.filterService.estado(); // true | false | null

  return this.prestamo().filter(item => {

    const matchesSearch =
      !search ||
      ( (item.tipo_gracia ?? '').toLowerCase().includes(search)
         );

    const matchescliente =
      !cliente || (item.id_cliente?.toString()).toLowerCase().includes(cliente);

    const matchesInmobiliaria =
      !inmobiliaria || (item.id_inmobiliaria?.toString()).toLowerCase().includes(inmobiliaria);

    const matchesEstado =
      estado === null ? true : item.estado === estado;

    return matchesSearch && matchescliente && matchesInmobiliaria && matchesEstado;
  });
});

  paginadoUsuario = computed(()=>{
    const empiezo = (this.paginas()- 1)* this.tamanioPagina();
    const final = empiezo + this.tamanioPagina();
    return this.filterprestamo().slice(empiezo,final);
  })

togglePrestamo(checked: boolean){
  console.log('Checkbox del header marcado', checked);
}

  ngOnInit() {}
}