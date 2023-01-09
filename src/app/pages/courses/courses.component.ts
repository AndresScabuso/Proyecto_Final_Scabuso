import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course/course.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // Curso
  courses: Course[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'name', 'description', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog, public service: CourseService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(response => {
      this.courses = response;
    });
  }

  getAllCourses() {
    this.service.getAll().subscribe(res => {
      this.courses = res;
    })
  }

  // Agrega un curso
  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.add(value).subscribe(response => {
          console.log(response);
          this.getAllCourses();
        });
      }
    })
  }

  // Modifica un curso
  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, { data: course, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.update(value, course.id).subscribe(response => {
          console.log(response);
          this.getAllCourses();
        });
      }
    })
  }

  // Elimina un curso
  removeCourse(course: Course) {
    this.service.delete(course.id).subscribe(response => {
      console.log(response);
      this.getAllCourses();
    });
  }

  details(course: Course) {
    this.dialogService.open(CourseDetailsComponent, { data: course });
  }
}
