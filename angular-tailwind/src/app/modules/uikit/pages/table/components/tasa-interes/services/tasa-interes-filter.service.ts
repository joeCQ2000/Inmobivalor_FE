import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasaInteresFilterService {
  searchField = signal<string>('');
  tipoTasa = signal<string>('');
  estadoField = signal<number>(0);

  resetAll() {
    this.searchField.set('');
    this.tipoTasa.set('');
    this.estadoField.set(0);
  }
}
