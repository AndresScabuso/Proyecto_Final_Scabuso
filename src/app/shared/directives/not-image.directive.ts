import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private elementImg: ElementRef) { }

  @HostListener('error')
  onError(): void {
    this.elementImg.nativeElement.src = 'https://www.newrosspianofestival.com/wp-content/uploads/2018/04/user-icon.png';
  }

}
