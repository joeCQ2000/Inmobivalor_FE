import { TasaInteres } from "./tasa-interes.model";

export interface CronogramaView {
  numero_cuota: number;
  periodo_gracia: string;
  saldo_inicial: string;
  interes: string;
  amortizacion: string;
  cuota_inc_seg: string;
  seg_des: string;
  seg_riesgo: string;
  comision: string;
  portes: string;
  gastos: string;
  saldo_final: string;
}
