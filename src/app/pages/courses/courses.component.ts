import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  public courses$: Observable<Course[]>;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'name', 'description','isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog, public service: CoursesService) {}

  ngOnInit(): void {
    this.courses$ = this.service.coursesData$;
  }

  // Agrega un curso
  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.add(value);
      }
    })
  }

  // Modifica un curso
  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, { data: course, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.update(value, course.id);
      }
    })
  }

  // Elimina un curso
  removeCourse(course: Course) {
    this.service.delete(course.id);
  }

  details(course: Course) {
    this.dialogService.open(CourseDetailsComponent, { data: course });
  }
}
