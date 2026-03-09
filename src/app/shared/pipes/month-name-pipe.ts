import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: false
})
export class MonthNamePipe implements PipeTransform {
  transform(mes: number): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // Validamos que el número esté entre 1 y 12
    if (mes >= 1 && mes <= 12) {
      return meses[mes - 1];
    }
    return '';
  }
}