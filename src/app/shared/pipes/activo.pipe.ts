import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? "Sí" : 'No';
  }

}
