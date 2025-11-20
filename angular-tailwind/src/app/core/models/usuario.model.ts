import { Rol } from "./rol.model";

export interface Usuario {
  id_usuario?: number;
  contrasenha?: string;   // suele no enviarse en listados
  username: string;
  nombres: string;
  apellidos: string;
  correo: string;
  dni: string;
  estado: boolean;
  telefono: string;
  roles?: Rol[];          // por la relación OneToMany (JsonIgnore en backend)
}