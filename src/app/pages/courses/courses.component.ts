import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Course } from 'src/app/models/course';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { LOAD_COURSES } from './store/courses-store.actions';
import { getCoursesLoading, selectCoursesStoreState } from './../courses/store/courses-store.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // Cursos
  public courses: Course[];
  public loading$ : boolean;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'name', 'description', 'isActive'];

  constructor(private readonly dialogService: MatDialog, public service: CoursesService, private authService: AuthService, private store: Store, private snackBar: MatSnackBar) {  
    if(this.isAdmin()) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }  
  }

  ngOnInit(): void {
    this.getAll();
    this.store.select(selectCoursesStoreState).subscribe(courses => {
      this.courses = courses.data
    })
  }

  getAll() {
    this.store.select(getCoursesLoading).subscribe(result => {
      this.loading$ = result
    })
    this.store.dispatch(LOAD_COURSES())
  }

  // Agrega un alumno
  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.saveCourse(value).subscribe({
          next: () => {
            this.getAll();
            this.snackBar.open('Curso creado con éxito.', 'Done');
          }
        });
      }
    })
  }
  
  // Modifica un alumno
  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, { data: course, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.updateCourse(value, course.id).subscribe({
          next: () => {
            this.getAll();
            this.snackBar.open('Curso modificado con éxito.', 'Done');
          }
        });
      }
    })
  }

  // Elimina un alumno
  removeCourse(course: Course) {
    this.service.deleteCoursesById(course.id).subscribe({
      next: () => {
          this.getAll();
          this.snackBar.open('Curso eliminado con éxito.', 'Done');
      }
    });
  }

  details(course: Course) {
    this.dialogService.open(CourseDetailsComponent, { data: course });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
