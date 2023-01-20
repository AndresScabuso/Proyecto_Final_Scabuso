import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
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
  // Alumnos
  public students: Student[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'firstName', 'lastName', 'email', 'isActive'];

  constructor(private readonly dialogService: MatDialog, private service: StudentService, private authService: AuthService) { 
    if(this.isAdmin()) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }
  }

  ngOnInit(): void {
    this.service.getStudents().subscribe((students) => {
      this.students = students;
    });  
  }

  // Agrega un alumno
  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.saveStudent(value);
      }
    })
  }
  
  // Modifica un alumno
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, { data: student, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.updateStudent(value, student.id);
      }
    })
  }

  // Elimina un alumno
  removeStudent(student: Student) {
    this.service.deleteStudentsById(student.id);
  }

  details(student: Student) {
    this.dialogService.open(StudentDetailsComponent, { data: student });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}