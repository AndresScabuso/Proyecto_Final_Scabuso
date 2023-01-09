import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html'
})
export class CourseDialogComponent implements OnInit {

  nameControl = new FormControl("", [Validators.required, Validators.minLength(3)])
  descriptionControl = new FormControl("", [Validators.required, Validators.minLength(3)])
  isActiveControl = new FormControl(true)

  courseForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    isActive: this.isActiveControl
  })

  constructor(private readonly dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Course | null) {
    if (data) {
      this.courseForm.patchValue(data);
    }
  }

  // Cierra el Dialog
  close() {
    this.dialogRef.close()
  }

  // Valida si el estudiante ingresado es válido
  courseValid() {
    return (this.courseForm.get('name')?.valid && 
    this.courseForm.get('description')?.valid)
  }

  ngOnInit(): void {
  }

}
