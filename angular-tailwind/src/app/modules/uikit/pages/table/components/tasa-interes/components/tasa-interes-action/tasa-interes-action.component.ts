import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TasaInteresFilterService } from '../../services/tasa-interes-filter.service';

@Component({
  selector: 'app-tasa-interes-action',
  imports: [AngularSvgIconModule, CommonModule],
  standalone: true,
  templateUrl: './tasa-interes-action.component.html',
  styleUrl: './tasa-interes-action.component.css',
})
export class TasaInteresActionComponent implements OnInit {
  
  constructor(
    public filterService: TasaInteresFilterService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.searchField.set(input.value);
  }

  onTipoTasaChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.tipoTasa.set(input.value);
  }

  onEstadoChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filterService.estadoField.set(Number(select.value));
  }

  goToRegistro(): void {
    this.router.navigate(['/components/tasa-interes-registrar']);
  }

  onSearch(tipoTasa: HTMLInputElement, estado: HTMLSelectElement) {
    this.filterService.tipoTasa.set(tipoTasa.value);
    this.filterService.estadoField.set(Number(estado.value || 0));
  }

  resetFilters(
    searchInput: HTMLInputElement,
    tipoTasa: HTMLInputElement,
    estado: HTMLSelectElement,
  ) {
    searchInput.value = '';
    tipoTasa.value = '';
    estado.value = '0';

    this.filterService.searchField.set('');
    this.filterService.tipoTasa.set('');
    this.filterService.estadoField.set(0);
  }
}
