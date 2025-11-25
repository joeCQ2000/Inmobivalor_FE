import { usuario } from "../models/usuario.model";

export interface Cliente {
  id_cliente?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  dni: string;
  es_activo: boolean;
  aplica_bono: boolean;
  usuario: usuario;
}
