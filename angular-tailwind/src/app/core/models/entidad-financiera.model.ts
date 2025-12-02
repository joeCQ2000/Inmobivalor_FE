import { TasaInteres } from './tasa-interes.model';

export interface EntidadFinanciera {
  id_entidad?: number;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  correo: string;
  estado: boolean;
  tasas?: TasaInteres[];   // ManyToMan
}
