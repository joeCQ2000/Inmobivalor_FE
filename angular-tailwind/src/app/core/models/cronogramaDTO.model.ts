export interface cronogramaDTO{
  numero_cuota: number;                      // Nº
  tea: number;                               // TEA
  tasa_periodica: number;                    // i' = TEP = TEM
  ia: number;                                // IA
  ip: number;                                // IP
  periodo_gracia: string;                    // P.G.

  saldo_inicial: number;
  saldo_inicial_indexado: number;
  interes: number;
  cuota_incluye_seguro_desgravamen: number;  // Cuota (inc Seg Des)
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