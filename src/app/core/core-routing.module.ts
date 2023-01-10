import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { CoursesComponent } from '../pages/courses/courses.component';
import { HomeComponent } from '../pages/home/home.component';
import { InscriptionsComponent } from '../pages/inscriptions/inscriptions.component';
import { StudentsComponent } from '../pages/students/students.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'inscriptions', component: InscriptionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
