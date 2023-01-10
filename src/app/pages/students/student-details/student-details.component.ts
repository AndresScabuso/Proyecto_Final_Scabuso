import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Inscription } from 'src/app/models/Inscription';
import { Student } from 'src/app/models/student';
import { InscriptionsService } from 'src/app/services/inscriptions/inscriptions.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  public inscriptions$: Observable<Inscription[]>;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'course', 'isActive', 'delete'];

  studentId: number;

  constructor(public service: InscriptionsService, private readonly dialogRef: MatDialogRef<StudentDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Student) {
    this.studentId = data.id;
  }

  ngOnInit(): void {
    this.inscriptions$ = of(this.service.getByStudentId(this.studentId));
  }

  // Elimina un inscripcion
  removeInscription(inscription: Inscription) {
    this.service.delete(inscription.id);
    this.inscriptions$ = of(this.service.getByStudentId(this.studentId));
  }

}
