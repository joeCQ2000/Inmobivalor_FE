import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TableFilterService } from './services/table-filter.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { usuario } from 'src/app/core/models/usuario.model';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-table',
  imports: [
    AngularSvgIconModule,
    FormsModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableActionComponent,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableClienteComponent implements OnInit {
  cliente = signal<Cliente[]>([]);
  paginas = signal(1);
  tamanioPagina = signal (10);

  totalpaginas = computed(()=>{
    const totalItems = this.filtercliente().length;
    return Math.ceil(totalItems / this.tamanioPagina())
  })
  constructor(private httpClient: HttpClient, private filterService: TableFilterService, private router: Router, private clienteservice : ClienteService) {
    this.clienteservice.list().subscribe({
      next: (data) => {
    this.cliente.set(
  data
);
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

 filtercliente = computed(() => {
  const search = this.filterService.searchField().toLowerCase();
  const nombres = this.filterService.nombres();
  const dni = this.filterService.dni();
  const es_activo = this.filterService.es_activo();
  

  return this.cliente().filter(item => {

    const matchesSearch =
      item.nombres?.toLowerCase().includes(search) ||
      item.correo?.toLowerCase().includes(search);
    const matchesnombre = item.nombres?.toLowerCase().includes(nombres);
    const matchesdni = item.dni?.toLowerCase().includes(dni);
    const matchesestado = es_activo === null ;
  
    return matchesSearch &&  matchesnombre && matchesdni && matchesestado ;
  });
});
  paginadoCliente = computed(()=>{
    const empiezo = (this.paginas()- 1)* this.tamanioPagina();
    const final = empiezo + this.tamanioPagina();
    return this.filtercliente().slice(empiezo,final);
  })

toggleMuestreo(checked: boolean){
  console.log('Checkbox del header marcado', checked);
}

  ngOnInit() {}
}