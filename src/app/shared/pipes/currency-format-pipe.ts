import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '$0.00';
    // Formato genérico de moneda (puedes cambiar 'USD' a 'COP', 'MXN', etc.)
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
  }
}