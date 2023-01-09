import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html'
})
export class StudentDialogComponent implements OnInit {

  firstNameControl = new FormControl("", [Validators.required, Validators.minLength(3)])
  lastNameControl = new FormControl("", [Validators.required, Validators.minLength(3)])
  emailControl = new FormControl("", [Validators.required, Validators.email])
  isActiveControl = new FormControl(true)

  studentForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    isActive: this.isActiveControl
  })

  constructor(private readonly dialogRef: MatDialogRef<StudentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Student | null) {
    if (data) {
      this.studentForm.patchValue(data);
    }
  }

  // Cierra el Dialog
  close() {
    this.dialogRef.close()
  }

  // Valida si el estudiante ingresado es válido
  studentValid() {
    return (this.studentForm.get('firstName')?.valid && 
    this.studentForm.get('lastName')?.valid && 
    this.studentForm.get('email')?.valid)
  }

  ngOnInit(): void {
  }

}
