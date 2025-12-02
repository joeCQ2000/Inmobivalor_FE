import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditoPrestamoService } from '../../../../../../../../src/app/core/services/credito-prestamo.service';
import { CreditoPrestamo } from '../../../../../../../../src/app/core/models/credito-prestamo.model';

@Component({
  selector: 'app-credito-prestamo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credito-prestamo.component.html',
  styleUrls: ['./credito-prestamo.component.css']
})
export class CreditoPrestamoComponent implements OnInit {

  creditos: CreditoPrestamo[] = [];
  loading = false;
  errorMessage = '';

  constructor(private creditoPrestamoService: CreditoPrestamoService) {}

  ngOnInit(): void {
    this.obtenerCreditos();

    // Si quieres reaccionar a cambios de lista desde el service:
    this.creditoPrestamoService.getList().subscribe((data) => {
      this.creditos = data;
    });
  }

  obtenerCreditos(): void {
    this.loading = true;
    this.errorMessage = '';

    this.creditoPrestamoService.list().subscribe({
      next: (data) => {
        this.creditos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar los créditos.';
        this.loading = false;
      }
    });
  }
}
