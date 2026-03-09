import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from '../../core/constants/app.constants';

@Pipe({
  name: 'categoryIcon',
  standalone: false
})
export class CategoryIconPipe implements PipeTransform {
  transform(nombreCategoria: string): string {
    const categoria = CATEGORIAS.find(c => c.nombre === nombreCategoria);
    return categoria ? categoria.icono : 'help-circle'; // Ícono por defecto si no existe
  }
}