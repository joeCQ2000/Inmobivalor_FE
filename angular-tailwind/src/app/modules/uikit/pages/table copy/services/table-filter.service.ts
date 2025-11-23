import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableFilterService {
  searchField = signal<string>('');
  statusField = signal<string>('');
  orderField = signal<string>(''); 
  username = signal<string>('');
  dni = signal<string>('');
  estado = signal<number>(0);

  resetAll() {
    this.searchField.set('');
    this.statusField.set('');
    this.orderField.set('');
    this.username.set('');
    this.dni.set('');
    this.estado.set(0);
  }
}
