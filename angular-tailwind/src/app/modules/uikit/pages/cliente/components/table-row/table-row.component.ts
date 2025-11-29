import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { usuario } from 'src/app/core/models/usuario.model';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/core/models/cliente.model';
@Component({
  selector: '[app-table-row]',
  imports: [FormsModule, CommonModule, AngularSvgIconModule],
  standalone: true,
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
})
export class TableRowComponent {
  @Input() cliente!: Cliente;

  constructor(private router: Router) {
    console.log('Router inyectado',this.router);
  }
  editarCliente(id: number) {
    console.log('Navegando a editar usuario con ID:', id);
    this.router.navigate(['/components/registraeditacliente', id])
  }
}