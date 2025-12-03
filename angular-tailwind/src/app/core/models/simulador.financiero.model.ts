import { CreditoPrestamo } from "./credito-prestamo.model";
import { EntidadFinanciera } from "./entidad-financiera.model";
import { TasaInteres } from "./tasa-interes.model";

// ====== DatosCronogramaDTO (Java -> TS) ======
export interface datoscronogramaDTO {
  precio_venta_activo: number;
  porcentaje_cuota_inicial: number;
  numero_anhos: 0;
  frecuencia_pago: number;
  numero_dias_por_anho: number;

  tea: number;
  tipo_gracia: string;   // "SIN", "TOTAL", "PARCIAL"
  meses_gracia: number;

  // Costes / gastos iniciales
  costes_notariales: number;
  costes_registrales: number;
  tasacion: number;
  comision_estudio: number;
  comision_activacion: number;

  // Costes / gastos periódicos
  comision_periodica: number;
  portes: number;
  gastos_administracion: number;
  porcentaje_seguro_desgravamen: number;
  porcentaje_seguro_riesgo: number;

  // Costo de oportunidad
  tasa_descuento: number;

  // Calculados por el backend
  saldo_a_financiar?: number;
  monto_prestamo?: number;
  numero_cuotas_por_anho?: number;
  numero_total_cuotas?: number;

  total_intereses?: number;
  total_amortizacion_capital?: number;
  total_seguro_desgravamen?: number;
  total_seguro_riesgo?: number;
  total_comisiones_periodicas?: number;
  total_portes_y_gastos_adm?: number
  cuotaPrepago :number,
  prepago : number,
  idCredito : CreditoPrestamo,
  entidadId : EntidadFinanciera;
}

// ====== CronogramaDTO (Java -> TS) ======
export interface cronogramaDTO {
  numero_cuota: number;
  tasa_interes : TasaInteres
  tea: number;
  tasa_periodica: number;
  ia: number;
  ip: number;
  periodo_gracia: string;   // "T", "P" o "S"

  saldo_inicial: number;
  saldo_inicial_indexado: number;
  interes: number;
  cuota_incluye_seguro_desgravamen: number;
  amortizacion: number;
  prepago: number;
  seguro_desgravamen: number;
  seguro_riesgo: number;
  comision: number;
  portes: number;
  gastos_administracion: number;
  saldo_final: number;
  flujo: number;
}


// ====== IndicadoresFinancierosDTO (Java -> TS) ======
export interface IndicadoresFinancierosDTO {
  id_indicador: number;
  van: number;
  tir: number;
  fecha_calculo: string;      // LocalDate -> string ISO "YYYY-MM-DD"
  tcea: number;
  trea: number; // o `any` si aún no lo usas
}

// ====== SimulacionFrancesResponseDTO (Java -> TS) ======
export interface SimulacionFrancesResponseDTO {
  datos: datoscronogramaDTO;
  cronograma: cronogramaDTO[];
  indicadores: IndicadoresFinancierosDTO;
}
