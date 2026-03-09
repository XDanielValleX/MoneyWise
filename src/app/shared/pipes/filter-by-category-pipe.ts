import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion';

@Pipe({
  name: 'filterByCategory',
  standalone: false
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(transacciones: Transaccion[], categoria: string): Transaccion[] {
    // Si no hay transacciones o el filtro es "todas", devolvemos la lista completa
    if (!transacciones || !categoria || categoria === 'todas') {
      return transacciones;
    }
    return transacciones.filter(t => t.categoria === categoria);
  }
}