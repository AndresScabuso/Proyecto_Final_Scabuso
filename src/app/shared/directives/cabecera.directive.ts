import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCabecera]'
})
export class CabeceraDirective {

  constructor(private element : ElementRef) { 
    element.nativeElement.style.fontSize = '20px';
  }

}
