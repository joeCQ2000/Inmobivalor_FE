import { Usuario } from './usuario.model';

export interface Inmobiliaria {
  id_inmobiliaria?: number;
  ubicacion: string;
  imagen: number | null;      // Long en Java → number en TS
  area: string;
  precio: number;
  descripcion: string;
  situacion_inmobiliaria: string;
  estado: boolean;
  usuario: Usuario;
}
