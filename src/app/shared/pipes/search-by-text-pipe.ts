import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion';

@Pipe({
  name: 'searchByText',
  standalone: false
})
export class SearchByTextPipe implements PipeTransform {
  transform(transacciones: Transaccion[], searchText: string): Transaccion[] {
    // Si no hay texto de búsqueda, mostramos todo
    if (!transacciones || !searchText) {
      return transacciones;
    }

    // Convertimos a minúsculas para que la búsqueda no sea sensible a mayúsculas
    const texto = searchText.toLowerCase();

    return transacciones.filter(t =>
      t.descripcion && t.descripcion.toLowerCase().includes(texto)
    );
  }
}