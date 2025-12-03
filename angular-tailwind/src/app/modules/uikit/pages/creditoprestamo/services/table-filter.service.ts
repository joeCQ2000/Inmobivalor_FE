import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableFilterService {
  searchField = signal<string>('');
  statusField = signal<string>('');
  orderField = signal<string>(''); 
  cliente = signal<string>('');
  inmobiliaria = signal<string>('');
estado = signal<boolean | null>(null);

  resetAll() {
    this.searchField.set('');
    this.statusField.set('');
    this.orderField.set('');
    this.cliente.set('');
    this.inmobiliaria.set('');
    this.estado.set(null);
  }

}
