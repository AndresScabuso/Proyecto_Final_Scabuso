import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraDirective } from './cabecera.directive';



@NgModule({
  declarations: [
    CabeceraDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CabeceraDirective
  ]
})
export class DirectivesModule { }
