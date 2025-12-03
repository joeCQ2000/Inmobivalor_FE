import { TasaInteres } from './tasa-interes.model';
import { EntidadFinanciera } from './entidad-financiera.model';

export interface EntidadTasa {
  id_entidad_tasa?: number;
  tasa: TasaInteres;              // @ManyToOne Tasa_interes
  entidad: EntidadFinanciera;     // @ManyToOne Entidad_financiera
}
