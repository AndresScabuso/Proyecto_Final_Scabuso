import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailsComponent,
    StudentDialogComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentsModule { }
