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
  
  public inscriptions$: Observable<Inscription[]>;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'student', 'isActive', 'delete'];

  courseId: number;

  constructor(public service: InscriptionsService, private readonly dialogRef: MatDialogRef<CourseDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Course) {
    this.courseId = data.id
  }
  
  
  ngOnInit(): void {
    this.inscriptions$ = of(this.service.getByCourseId(this.courseId));
  }

  // Elimina un inscripcion
  removeInscription(inscription: Inscription) {
    this.service.delete(inscription.id);
    this.inscriptions$ = of(this.service.getByCourseId(this.courseId));
  }
}
