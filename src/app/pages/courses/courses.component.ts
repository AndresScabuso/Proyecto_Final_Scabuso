import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Course } from 'src/app/models/course';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // Cursos
  public courses: Course[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'name', 'description', 'isActive'];

  constructor(private readonly dialogService: MatDialog, public service: CoursesService, private authService: AuthService) {
    if(this.isAdmin()) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }  
  }

  ngOnInit(): void {
    this.service.getCourses().subscribe((courses) => {
      this.courses = courses;
    }); 
  }

  // Agrega un alumno
  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.saveCourse(value);
      }
    })
  }
  
  // Modifica un alumno
  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, { data: course, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.updateCourse(value, course.id);
      }
    })
  }

  // Elimina un alumno
  removeCourse(course: Course) {
    this.service.deleteCoursesById(course.id);
  }

  details(course: Course) {
    this.dialogService.open(CourseDetailsComponent, { data: course });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
