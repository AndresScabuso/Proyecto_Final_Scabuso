import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';



@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class InscriptionsModule { }
