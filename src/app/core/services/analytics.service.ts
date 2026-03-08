import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransaccionService } from './transaccion.service';
import { ResumenFinanciero } from '../models/resumen-financiero';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Estado inicial del dashboard (todo en cero)
  private resumenSubject = new BehaviorSubject<ResumenFinanciero>({
    saldoActual: 0,
    totalGastosMes: 0,
    totalIngresosMes: 0,
    gastosPorCategoria: {}
  });
  public resumen$ = this.resumenSubject.asObservable();

  constructor(private transaccionService: TransaccionService) {
    // Nos suscribimos a las transacciones. ¡Si cambian, recalculamos todo!
    this.transaccionService.transacciones$.subscribe(transacciones => {
      this.calcularResumen(transacciones);
    });
  }

  private calcularResumen(transacciones: Transaccion[]) {
    let saldoActual = 0;
    let totalGastosMes = 0;
    let totalIngresosMes = 0;
    const gastosPorCategoria: { [key: string]: number } = {};

    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();

    transacciones.forEach(t => {
      const fechaTx = new Date(t.fecha);
      const esEsteMes = fechaTx.getMonth() === mesActual && fechaTx.getFullYear() === anioActual;

      if (t.tipo === 'ingreso') {
        saldoActual += t.monto;
        if (esEsteMes) totalIngresosMes += t.monto;
      } else if (t.tipo === 'gasto') {
        saldoActual -= t.monto;
        if (esEsteMes) {
          totalGastosMes += t.monto;

          // Sumamos al desglose por categoría (RF-2)
          if (!gastosPorCategoria[t.categoria]) {
            gastosPorCategoria[t.categoria] = 0;
          }
          gastosPorCategoria[t.categoria] += t.monto;
        }
      }
    });

    // Actualizamos el estado para que el Dashboard lo muestre
    this.resumenSubject.next({
      saldoActual,
      totalGastosMes,
      totalIngresosMes,
      gastosPorCategoria
    });
  }
}