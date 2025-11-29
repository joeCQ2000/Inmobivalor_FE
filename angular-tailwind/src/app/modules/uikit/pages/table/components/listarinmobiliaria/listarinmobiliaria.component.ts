import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ImagineService } from 'src/app/modules/layout/services/imagine.service';
import { InmobiliariaService } from 'src/app/modules/layout/services/inmobiliaria.service';

@Component({
  selector: 'app-listarinmobiliaria',
  imports: [CommonModule],
  templateUrl: './listarinmobiliaria.component.html',
  styleUrl: './listarinmobiliaria.component.css',
})
export class ListarinmobiliariaComponent implements OnInit {
  inmobiliarias: any[] = []; // Para almacenar la lista de inmobiliarias
  pagedInmobiliarias: any[] = []; // Para almacenar las inmobiliarias de la página actual
  totalItems: number = 0; // Total de inmobiliarias (para la paginación)
  currentPage: number = 1; // Página actual
  pageSize: number = 5; // Número de inmobiliarias por página
  imagenes: { [key: number]: string } = {}; // Almacena la URL de las imágenes por ID

  constructor(private inmobiliariaService: InmobiliariaService, private imagenService: ImagineService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadInmobiliarias();
  }

  // Cargar las inmobiliarias con paginación
   loadInmobiliarias(): void {
    this.inmobiliariaService.listarInmobiliarias().subscribe((data) => {
      this.inmobiliarias = data;  // Guardamos todos los datos de inmobiliarias
      this.totalItems = data.length;  // Total de elementos para la paginación
      this.setPagedInmobiliarias();  // Configuramos las inmobiliarias para la página actual
      this.loadImagenes();  // Cargamos las imágenes
    });
  }

  // Establecer las inmobiliarias de la página actual
  setPagedInmobiliarias(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedInmobiliarias = this.inmobiliarias.slice(startIndex, endIndex);  // Cortamos los datos para la página actual
  }

  // Cargar las imágenes de cada inmobiliaria
  loadImagenes(): void {
    const imagePromises = this.pagedInmobiliarias.map((inmobiliaria) => {
      if (inmobiliaria.imagen) {
        return this.imagenService.getImage(inmobiliaria.imagen).toPromise().then((imageBlob) => {
          // Verificamos si el imageBlob es válido
          if (imageBlob) {
            const imageUrl = URL.createObjectURL(imageBlob);
            // Guardamos la URL en el objeto de imágenes usando el id de la inmobiliaria
            this.imagenes[inmobiliaria.id] = imageUrl;
          } else {
            console.warn(`No se pudo cargar la imagen para la inmobiliaria con ID: ${inmobiliaria.id}`);
          }
        });
      }
      return Promise.resolve(); // Retornamos una promesa vacía para evitar el error en el map()
    });

    // Esperar a que todas las imágenes se carguen antes de continuar
    Promise.all(imagePromises).then(() => {
      console.log("Todas las imágenes han sido cargadas");
      // Forzamos la detección de cambios para que Angular actualice la vista
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error("Error al cargar las imágenes", error);
    });
  }

  // Cambiar de página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.setPagedInmobiliarias();  // Actualizamos los datos para la nueva página
    this.loadImagenes();  // Cargamos las imágenes para la nueva página
  }

  // Método para editar la inmobiliaria (puedes redirigir al formulario de edición)
  editarInmobiliaria(id: number): void {
    console.log('Editar inmobiliaria con ID:', id);
  }
}
