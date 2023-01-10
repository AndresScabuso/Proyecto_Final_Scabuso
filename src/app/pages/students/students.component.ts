import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student/student.service';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  // Estudiantes
  public students$: Observable<Student[]>;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'firstName', 'lastName', 'email', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog, public service: StudentService) { }

  ngOnInit(): void {
    this.students$ = this.service.studentsData$;
  }

  // Agrega un estudiante
  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.add(value);
      }
    })
  }

  // Modifica un estudiante
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, { data: student, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.update(value, student.id);
      }
    })
  }

  // Elimina un estudiante
  removeStudent(student: Student) {
    this.service.delete(student.id);
  }

  details(student: Student) {
    this.dialogService.open(StudentDetailsComponent, { data: student });
  }
}