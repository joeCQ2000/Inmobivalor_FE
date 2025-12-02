import { EntidadFinanciera } from './entidad-financiera.model';
import { Cliente } from './cliente.model';
import { Inmobiliaria } from './inmobiliaria.model';
import { Moneda } from './moneda.model';

export interface CreditoPrestamo {
  id_credito: number;
  plazo_meses: string;
  tipo_gracia: null;
  monto_bono: number;
  fecha_inicio: string;       // LocalDate → string 'YYYY-MM-DD'
  fecha_fin: string;
  capitalizacion: string;
  estado: boolean;
  meses_gracia:0;
  id_entidad: EntidadFinanciera;
  id_cliente: Cliente;
  id_inmobiliaria: Inmobiliaria;
  id_moneda: Moneda;
}
