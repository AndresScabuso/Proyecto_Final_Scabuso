import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivoPipe } from './activo.pipe';



@NgModule({
  declarations: [
    ActivoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActivoPipe
  ]
})
export class PipesModule { }
