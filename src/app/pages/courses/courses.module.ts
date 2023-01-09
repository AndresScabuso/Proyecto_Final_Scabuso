import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    DirectivesModule
  ]
})
export class CoursesModule { }
