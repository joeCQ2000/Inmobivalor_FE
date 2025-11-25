export interface TasaInteres {
  id_tasa?: number;
  tipo_tasa: string;    // tipo_tasa_interes en BD → getter getTipo_tasa()
  tasa_pct: number;
  estado: boolean;
}
