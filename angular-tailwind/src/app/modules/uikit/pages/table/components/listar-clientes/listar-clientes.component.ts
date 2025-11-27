import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/core/models/cliente.model';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  loading = false;
  errorMessage: string = ''; // Define la propiedad errorMessage

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.loading = true;
    this.errorMessage = ''; // Inicializa errorMessage

    this.clienteService.list().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar los clientes.'; // Asigna el mensaje de error
        this.loading = false;
      }
    });
  }
}
