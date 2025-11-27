import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonedaService } from 'src/app/core/services/moneda.service';
import { Moneda } from 'src/app/core/models/moneda.model';

@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.css']
})
export class MonedaComponent implements OnInit {

  monedas: Moneda[] = [];
  loading = false;
  errorMessage = '';

  constructor(private monedaService: MonedaService) {}

  ngOnInit(): void {
    this.obtenerMonedas();
  }

  obtenerMonedas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.monedaService.list().subscribe({
      next: (data) => {
        this.monedas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar las monedas.';
        this.loading = false;
      }
    });
  }

  eliminarMoneda(id: number): void {
    if (confirm('¿Está seguro de eliminar esta moneda?')) {
      this.monedaService.delete(id).subscribe({
        next: () => {
          this.obtenerMonedas();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la moneda');
        }
      });
    }
  }
}
