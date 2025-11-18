import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { datoscronogramaDTO } from 'src/app/core/models/datoscronogramaDTO.model';
import { CronogramaConfigService } from 'src/app/core/services/cronogramaconfig.service';

@Component({
  selector: 'app-metodo-frances',
  imports: [FormsModule],
  templateUrl: './metodo-frances.component.html',
  styleUrl: './metodo-frances.component.css'
})

 export class MetodoFrancesComponent implements OnInit {

  datosCronograma!: datoscronogramaDTO;

  constructor(private config: CronogramaConfigService) {}

  ngOnInit(): void {
    this.datosCronograma = this.config.initDatosCronograma();
  }
}
