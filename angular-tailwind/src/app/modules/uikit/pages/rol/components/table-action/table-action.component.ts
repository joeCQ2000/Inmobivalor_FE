import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from '../../services/table-filter.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table-action',
  imports: [AngularSvgIconModule, CommonModule],
  standalone: true,
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.css',
})
export class TableActionComponent implements OnInit {
  

  constructor(
    public filterService: TableFilterService,
    public router : Router
  
  ) {}

  ngOnInit(): void {
  }

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

  onEstadoChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filterService.estado.set(Number(select.value));
  }
   goToRegistro(): void {
  this.router.navigate(['/components/registraeditausuario']);
}

  onSearch(username: HTMLInputElement, dni: HTMLInputElement, estado: HTMLSelectElement) {
  this.filterService.username.set(username.value);
  this.filterService.dni.set(dni.value);
  this.filterService.estado.set(Number(estado.value || 0));
}
  resetFilters(
    searchInput: HTMLInputElement,
  username: HTMLInputElement,
  dni: HTMLInputElement,
  estado: HTMLSelectElement,
) {
  searchInput.value = '';
  username.value = '';
  dni.value = '';
  estado.value = '0';

  this.filterService.searchField.set('');
  this.filterService.username?.set?.('');
  this.filterService.dni?.set?.('');
  this.filterService.estado?.set?.(0);
  }
}