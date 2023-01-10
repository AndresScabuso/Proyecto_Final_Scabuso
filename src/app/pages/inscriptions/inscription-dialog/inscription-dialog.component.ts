import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Inscription } from 'src/app/models/Inscription';
import { Student } from 'src/app/models/student';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html'
})
export class InscriptionDialogComponent implements OnInit {

  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  studentControl = new FormControl<Student | null>(null, Validators.required)
  courseControl = new FormControl<Course | null>(null, Validators.required)
  isActiveControl = new FormControl(true)

  inscriptionForm = new FormGroup({
    student: this.studentControl,
    course: this.courseControl,
    isActive: this.isActiveControl
  })

  constructor(private readonly dialogRef: MatDialogRef<InscriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Inscription, public stuService: StudentService, public couService: CoursesService) {
    if (data) {
      this.inscriptionForm.patchValue(data);
    }
    this.students$ = stuService.studentsData$;
    this.courses$ = couService.coursesData$;
  }

  // Cierra el Dialog
  close() {
    this.dialogRef.close()
  }

  // Valida si la inscripción ingresada es válida
  inscriptionValid() {
    return (this.inscriptionForm.get('student')?.valid && 
    this.inscriptionForm.get('course')?.valid)
  }

  ngOnInit(): void {
  }

}
