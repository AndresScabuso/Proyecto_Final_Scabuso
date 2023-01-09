import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  // Estudiante
  students: Student[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'firstName', 'lastName', 'email', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog, public service: StudentService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(response => {
      this.students = response;
    });
  }

  getAllStudents() {
    this.service.getAll().subscribe(res => {
      this.students = res;
    })
  }

  // Agrega un estudiante
  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.add(value).subscribe(response => {
          console.log(response);
          this.getAllStudents();
        });
      }
    })
  }

  // Modifica un estudiante
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, { data: student, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.update(value, student.id).subscribe(response => {
          console.log(response);
          this.getAllStudents();
        });
      }
    })
  }

  // Elimina un estudiante
  removeStudent(student: Student) {
    this.service.delete(student.id).subscribe(response => {
      console.log(response);
      this.getAllStudents();
    });
  }

  details(student: Student) {
    this.dialogService.open(StudentDetailsComponent, { data: student });
  }
}
