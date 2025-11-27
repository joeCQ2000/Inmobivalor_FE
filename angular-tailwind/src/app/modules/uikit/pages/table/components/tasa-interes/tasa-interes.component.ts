import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasaInteresService } from 'src/app/core/services/tasa-interes.service';
import { TasaInteres } from 'src/app/core/models/tasa-interes.model';

@Component({
  selector: 'app-tasa-interes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasa-interes.component.html',
  styleUrls: ['./tasa-interes.component.css']
})
export class TasaInteresComponent implements OnInit {

  tasas: TasaInteres[] = [];
  loading = false;
  errorMessage = '';

  constructor(private tasaInteresService: TasaInteresService) {}

  ngOnInit(): void {
    this.obtenerTasas();
  }

  obtenerTasas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.tasaInteresService.list().subscribe({
      next: (data) => {
        this.tasas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar las tasas de interés.';
        this.loading = false;
      }
    });
  }

  eliminarTasa(id: number): void {
    if (confirm('¿Está seguro de eliminar esta tasa de interés?')) {
      this.tasaInteresService.delete(id).subscribe({
        next: () => {
          this.obtenerTasas();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la tasa de interés');
        }
      });
    }
  }
}
