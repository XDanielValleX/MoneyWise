import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from '../../core/constants/app.constants';

@Pipe({
  name: 'categoryColor',
  standalone: false
})
export class CategoryColorPipe implements PipeTransform {
  transform(nombreCategoria: string): string {
    const categoria = CATEGORIAS.find(c => c.nombre === nombreCategoria);
    return categoria ? categoria.color : 'medium'; // Color gris por defecto si no existe
  }
}