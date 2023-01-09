import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // Cursos precargados
  courses : Course[] = [
    new Course(1, 'Programacion I', 'Html, CSS, Javascript', true),
    new Course(2, 'Base de Datos I', 'Fundamentos de base de datos', true)
  ]

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'name', 'description','isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog) {}

  // Agrega un curso
  addCourse() {
    const dialog = this.dialogService.open(CourseDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        const lastId = this.courses[this.courses.length -1]?.id;
        this.courses = [...this.courses, new Course(lastId+1, value.name, value.description, value.isActive)];
      }
    })
  }

  // Modifica un curso
  editCourse(course: Course) {
    const dialog = this.dialogService.open(CourseDialogComponent, { data: course, width: '60%' });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.courses = this.courses.map((cou) => cou.id === course.id ? { ...cou, ...data } : cou);
      }
    })
  }

  // Elimina un curso
  removeCourse(course: Course) {
    this.courses = this.courses.filter((cou) => cou.id !== course.id);
  }

  details(course: Course) {
    this.dialogService.open(CourseDetailsComponent, { data: course });
  }
}
