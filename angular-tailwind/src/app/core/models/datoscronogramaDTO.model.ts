import { CreditoPrestamo } from "./credito-prestamo.model";
import { EntidadFinanciera } from "./entidad-financiera.model";

export interface datoscronogramaDTO{
  precio_venta_activo: number;
  porcentaje_cuota_inicial: number;
  numero_anhos: number;
  frecuencia_pago: number;
  numero_dias_por_anho: number;

  // Costes/gastos iniciales
  costes_notariales: number;
  costes_registrales: number;
  tasacion: number;
  comision_estudio: number;
  comision_activacion: number;

  // Costes/gastos periódicos
  comision_periodica: number;
  portes: number;
  gastos_administracion: number;
  porcentaje_seguro_desgravamen: number;
  porcentaje_seguro_riesgo: number;

  // Costo de oportunidad
  tasa_descuento: number;

  // Financiamiento
  saldo_a_financiar: number;
  monto_prestamo: number;
  numero_cuotas_por_anho: number;
  numero_total_cuotas: number;

  // Totales por costes/gastos
  total_intereses: number;
  total_amortizacion_capital: number;
  total_seguro_desgravamen: number;
  total_seguro_riesgo: number;
  total_comisiones_periodicas: number;
  total_portes_y_gastos_adm: number;
  cuotaPrepago :number,
  prepago : number,
  idCredito : CreditoPrestamo,
  entidadId : EntidadFinanciera
}