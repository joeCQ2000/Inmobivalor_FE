import { usuario } from "./usuario.model";

export interface Rol {
  id_rol?: number;
  nombreRol: string;
  estado: boolean;
  user?: usuario;         // muchas veces no lo necesitas en el front
}