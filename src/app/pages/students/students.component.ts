import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student/student.service';
import { LOAD_STUDENTS } from './store/students-store.actions';
import { getStudentLoading, selectStudentStoreState } from './store/students-store.selectors';
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
  public loading$ : boolean;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'firstName', 'lastName', 'email', 'isActive'];

  constructor(private readonly dialogService: MatDialog, private service: StudentService, private authService: AuthService, private store: Store, private snackBar: MatSnackBar) { 
    if(this.isAdmin()) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }
  }

  ngOnInit(): void {
    this.getAll();
    this.store.select(selectStudentStoreState).subscribe(students => {
      this.students = students.data
    })
  }

  getAll() {
    this.store.select(getStudentLoading).subscribe(result => {
      this.loading$ = result
    })
    this.store.dispatch(LOAD_STUDENTS())
  }

  // Agrega un alumno
  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.saveStudent(value).subscribe({
          next: () => {
            this.getAll();
            this.snackBar.open('Alumno creado con éxito', 'Done');
          }
        });
      }
    })
  }
  
  // Modifica un alumno
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, { data: student, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      console.log(value)
      if (value) {
        this.service.updateStudent(value, student.id).subscribe({
          next: () => {
            this.getAll();
            this.snackBar.open('Alumno modificado con éxito', 'Done');
          }
        });
      }
    })
  }

  // Elimina un alumno
  removeStudent(student: Student) {
    this.service.deleteStudentsById(student.id).subscribe({
      next: () => {
        this.getAll();
        this.snackBar.open('Alumno eliminado con éxito', 'Done');
      }
    });
  }

  details(student: Student) {
    this.dialogService.open(StudentDetailsComponent, { data: student });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }   
}