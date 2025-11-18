import { Injectable } from '@angular/core';
import { datoscronogramaDTO } from '../models/datoscronogramaDTO.model';

@Injectable({ providedIn: 'root' })
export class CronogramaConfigService  {

  initDatosCronograma(): datoscronogramaDTO {
    return {
      precio_venta_activo: 0,
      porcentaje_cuota_inicial: 0.20,
      numero_anhos: 10,
      frecuencia_pago: 12,
      numero_dias_por_anho: 360,

      costes_notariales: 1500,
      costes_registrales: 200,
      tasacion: 1200,
      comision_estudio: 100,
      comision_activacion: 0,

      comision_periodica: 3.0,
      portes: 3.5,
      gastos_administracion: 10.0,
      porcentaje_seguro_desgravamen: 0.045,
      porcentaje_seguro_riesgo: 0.0405,

      tasa_descuento: 0.27,

      saldo_a_financiar: 0,
      monto_prestamo: 0,
      numero_cuotas_por_anho: 0,
      numero_total_cuotas: 0,
      total_intereses: 0,
      total_amortizacion_capital: 0,
      total_seguro_desgravamen: 0,
      total_seguro_riesgo: 0,
      total_comisiones_periodicas: 0,
      total_portes_y_gastos_adm: 0,
    };
  }
}