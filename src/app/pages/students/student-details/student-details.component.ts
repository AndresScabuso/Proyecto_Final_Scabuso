import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Inscription } from 'src/app/models/Inscription';
import { Student } from 'src/app/models/student';
import { InscriptionsService } from 'src/app/services/inscriptions/inscriptions.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  public inscriptions: Inscription[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['course', 'isActive','delete'];

  studentId: number;

  constructor(private service: InscriptionsService, private authService: AuthService, private readonly dialogRef: MatDialogRef<StudentDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Student) {
    this.studentId = data.id;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getInscriptionByStudentId(this.studentId).subscribe((inscriptions) => {
      this.inscriptions = inscriptions;
    });
  }

  // Elimina un inscripcion
  removeInscription(inscription: Inscription) {
    this.service.deleteInscriptionsById(inscription.id).subscribe({
      next: () => {
        this.getAll();
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
