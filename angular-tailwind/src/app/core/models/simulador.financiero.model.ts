export interface DatosCronogramaDTO {
  precio_venta_activo: number;
  porcentaje_cuota_inicial: number;
  numero_anhos: number;
  frecuencia_pago: number;
  numero_dias_por_anho: number;

  tea: number;
  tipo_gracia: string; // "SIN", "TOTAL", "PARCIAL"
  meses_gracia: number;

  costes_notariales: number;
  costes_registrales: number;
  tasacion: number;
  comision_estudio: number;
  comision_activacion: number;

  comision_periodica: number;
  portes: number;
  gastos_administracion: number;

  porcentaje_seguro_desgravamen: number;
  porcentaje_seguro_riesgo: number;

  tasa_descuento: number;

  // Campos calculados por el backend (puedes ponerlos opcionales si quieres)
  saldo_a_financiar?: number;
  monto_prestamo?: number;
  numero_cuotas_por_anho?: number;
  numero_total_cuotas?: number;
  total_intereses?: number;
  total_amortizacion_capital?: number;
  total_seguro_desgravamen?: number;
  total_seguro_riesgo?: number;
  total_comisiones_periodicas?: number;
  total_portes_y_gastos_adm?: number;
}

export interface CronogramaDTO {
  numero_cuota: number;
  tea: number;
  tasa_periodica: number;
  ia: number;
  ip: number;
  periodo_gracia: string;

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

export interface IndicadoresFinancierosDTO {
  van: number;
  tir: number;
  tcea: number; // en porcentaje (según tu service)
}

export interface SimulacionFrancesResponseDTO {
  datos: DatosCronogramaDTO;
  cronograma: CronogramaDTO[];
  indicadores: IndicadoresFinancierosDTO;
}