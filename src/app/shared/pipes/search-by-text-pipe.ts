import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByText',
  standalone: false
})
export class SearchByTextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
