// category-color-pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from '../../core/constants/app.constants';

@Pipe({
  name: 'categoryColor',
  standalone: false
})
export class CategoryColorPipe implements PipeTransform {
  transform(nombreCategoria: string): string {
    const categoria = CATEGORIAS.find(c => c.nombre === nombreCategoria);
    const colorName = categoria ? categoria.color : 'medium';

    // Devolvemos la variable CSS de Ionic para que funcione en [style.background]
    return `var(--ion-color-${colorName})`;
  }
}