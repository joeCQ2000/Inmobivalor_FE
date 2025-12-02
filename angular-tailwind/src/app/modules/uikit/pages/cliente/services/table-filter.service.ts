import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableFilterService {
  searchField = signal<string>('');
  statusField = signal<string>('');
  orderField = signal<string>(''); 
  nombres = signal<string>('');
  dni = signal<string>('');
  es_activo = signal<boolean | null>(null);

  resetAll() {
    this.searchField.set('');
    this.statusField.set('');
    this.orderField.set('');
    this.nombres.set('');
    this.dni.set('');
     this.es_activo.set(null);
  }
}
