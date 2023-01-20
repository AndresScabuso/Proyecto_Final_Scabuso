import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html'
})
export class UserDialogComponent implements OnInit {

  emailControl = new FormControl("")
  passwordControl = new FormControl("", [Validators.required, Validators.minLength(6)])

  usersForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })

  constructor(private readonly dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User | null) {
    if (data) {
      this.usersForm.patchValue(data);
    }
  }

  // Cierra el Dialog
  close() {
    this.dialogRef.close()
  }

  // Valida si el estudiante ingresado es válido
  userValid() {
    return (this.usersForm.get('password')?.valid)
  }

  ngOnInit(): void {
  }

}
