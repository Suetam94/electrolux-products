import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToPtBr',
  standalone: true,
})
export class NumberToPtBrPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
