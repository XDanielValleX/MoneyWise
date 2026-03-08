import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType',
  standalone: false
})
export class FilterByTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
