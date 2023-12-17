import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tri'
})
export class TriPipe implements PipeTransform {
  transform(array: any[], sortField: string, sortOrder: string = 'asc'): any[] {
    if (!array || array.length === 0 || !sortField) {
      return array;
    }

    array.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return array;
  }
}
