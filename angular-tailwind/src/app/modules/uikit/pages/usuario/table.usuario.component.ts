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
export class TableUsuarioComponent implements OnInit {
  usuario = signal<usuario[]>([]);
  paginas = signal(1);
  tamanioPagina = signal (10);

  totalpaginas = computed(()=>{
    const totalItems = this.filterUsuario().length;
    return Math.ceil(totalItems / this.tamanioPagina())
  })
  constructor(private httpClient: HttpClient, private filterService: TableFilterService, private router: Router, private usuarioservice : UsuarioService) {
    this.usuarioservice.Listar().subscribe({
      next: (data) => {
    this.usuario.set(
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
filterUsuario = computed(() => {
  const search   = this.filterService.searchField().toLowerCase();
  const username = this.filterService.username().toLowerCase();
  const dni      = this.filterService.dni().toLowerCase();
  const estado   = this.filterService.estado(); // true | false | null

  return this.usuario().filter(item => {

    const matchesSearch =
      !search ||
      ( (item.nombres ?? '').toLowerCase().includes(search) ||
        (item.correo  ?? '').toLowerCase().includes(search) );

    const matchesUsername =
      !username || (item.username ?? '').toLowerCase().includes(username);

    const matchesDni =
      !dni || (item.dni ?? '').toLowerCase().includes(dni);

    const matchesEstado =
      estado === null ? true : item.estado === estado;

    return matchesSearch && matchesUsername && matchesDni && matchesEstado;
  });
});

  paginadoUsuario = computed(()=>{
    const empiezo = (this.paginas()- 1)* this.tamanioPagina();
    const final = empiezo + this.tamanioPagina();
    return this.filterUsuario().slice(empiezo,final);
  })

toggleMuestreo(checked: boolean){
  console.log('Checkbox del header marcado', checked);
}

  ngOnInit() {}
}