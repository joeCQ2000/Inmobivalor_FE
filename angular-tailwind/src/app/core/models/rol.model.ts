import { Usuario } from "./usuario.model";

export interface Rol {
  id_rol?: number;
  nombreRol: string;
  estado: boolean;
  user?: Usuario;         // muchas veces no lo necesitas en el front
}