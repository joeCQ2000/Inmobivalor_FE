import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from '../../services/table-filter.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-action',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.css',
})
export class TableActionComponent implements OnInit {
  // null = todos, true = activos, false = inactivos
  filtroEstado = new FormControl<boolean | null>(null);

  constructor(
    public filterService: TableFilterService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.searchField.set(input.value);
  }

  onUsernameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.username.set(input.value);
  }

  onDNIChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.dni.set(input.value);
  }
onSearch(username: HTMLInputElement, dni: HTMLInputElement) {
    this.filterService.username.set(username.value.trim());
    this.filterService.dni.set(dni.value.trim());

    const estado = this.filtroEstado.value; // true | false | null
    this.filterService.estado.set(estado);  // signal<boolean | null>
  }

  resetFilters(
    searchInput: HTMLInputElement,
    username: HTMLInputElement,
    dni: HTMLInputElement
  ) {
    // limpiar inputs visuales
    searchInput.value = '';
    username.value = '';
    dni.value = '';
    this.filtroEstado.setValue(null);

    // limpiar en el service
    this.filterService.searchField.set('');
    this.filterService.username.set('');
    this.filterService.dni.set('');
    this.filterService.estado.set(null);
  }

  goToRegistro(): void {
    this.router.navigate(['/components/registraeditausuario']);
  }
}