import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from '../../services/table-filter.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-table-action',
  imports: [AngularSvgIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.css',
})
export class TableActionComponent implements OnInit {
  
filtroEstado = new FormControl<boolean | null>(null);
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

  onNombreChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.nombres.set(input.value);
  }

  onDNIChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.dni.set(input.value);
  }

onSearch(nombres: HTMLInputElement, dni: HTMLInputElement) {
    this.filterService.nombres.set(nombres.value.trim());
    this.filterService.dni.set(dni.value.trim());

    const es_activo = this.filtroEstado.value; 
    this.filterService.es_activo.set(es_activo); 
  }

  resetFilters(
    searchInput: HTMLInputElement,
    username: HTMLInputElement,
    dni: HTMLInputElement
  ) {
    
    searchInput.value = '';
    username.value = '';
    dni.value = '';
    this.filtroEstado.setValue(null);

 
    this.filterService.searchField.set('');
    this.filterService.nombres.set('');
    this.filterService.dni.set('');
    this.filterService.es_activo.set(null);
  }

goToRegistro(): void {
  this.router.navigate(['/components/registraeditacliente']);
}
}