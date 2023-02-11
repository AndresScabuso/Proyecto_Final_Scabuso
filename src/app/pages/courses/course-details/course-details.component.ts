import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Inscription } from 'src/app/models/Inscription';
import { InscriptionsService } from 'src/app/services/inscriptions/inscriptions.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit {
  
  public inscriptions: Inscription[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['student', 'isActive', 'delete'];

  courseId: string;

  constructor(private service: InscriptionsService, private readonly dialogRef: MatDialogRef<CourseDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Course) {
    this.courseId = data.id
  }
  
  
  ngOnInit(): void {
     this.getAll();
  }

  getAll() {
    this.service.getInscriptionByCourseId(this.courseId).subscribe((inscriptions) => {
      this.inscriptions = inscriptions;
     })
  }

  // Elimina un inscripcion
  removeInscription(inscription: Inscription) {
    this.service.deleteInscriptionsById(inscription.id).subscribe({
      next: () => {
        this.getAll();
      }
    });
  }
}
