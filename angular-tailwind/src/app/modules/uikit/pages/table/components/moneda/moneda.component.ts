import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonedaService } from 'src/app/core/services/moneda.service';
import { Moneda } from 'src/app/core/models/moneda.model';
import { TableFooterComponent } from '../../../table copy/components/table-footer/table-footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [CommonModule, TableFooterComponent],
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.css']
})
export class MonedaComponent implements OnInit {

  monedas = signal<Moneda[]>([]);
  paginas = signal(1);
  tamanioPagina = signal(10);
  loading = false;
  errorMessage = '';

  totalpaginas = computed(() => {
    const totalItems = this.monedas().length;
    return Math.ceil(totalItems / this.tamanioPagina());
  });

  constructor(
    private monedaService: MonedaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerMonedas();
  }

  obtenerMonedas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.monedaService.list().subscribe({
      next: (data) => {
        this.monedas.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar las monedas.';
        this.loading = false;
      }
    });
  }

  paginadoMonedas = computed(() => {
    const empiezo = (this.paginas() - 1) * this.tamanioPagina();
    const final = empiezo + this.tamanioPagina();
    return this.monedas().slice(empiezo, final);
  });

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

  goToRegistro(): void {
    this.router.navigate(['/components/moneda-registrar']);
  }
}
