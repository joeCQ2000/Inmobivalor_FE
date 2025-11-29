import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { usuario } from 'src/app/core/models/usuario.model';
import { Router } from '@angular/router';
@Component({
  selector: '[app-table-row]',
  imports: [FormsModule, CommonModule, AngularSvgIconModule],
  standalone: true,
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
})
export class TableRowComponent {
  @Input() usuario!: usuario;

  constructor(private router: Router) {
    console.log('Router inyectado',this.router);
  }
  editarUsuario(id: number) {
    console.log('Navegando a editar usuario con ID:', id);
    this.router.navigate(['/components/registraeditausuario', id])
  }
}