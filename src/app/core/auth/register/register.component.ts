import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../models/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private readonly userService: UsersService, private readonly authService: AuthService, private readonly router: Router, private snackBar: MatSnackBar) {}

  emailControl = new FormControl("", [Validators.required, Validators.email]);
  passwordControl = new FormControl("", [Validators.required, Validators.minLength(6)]);

  registerForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })

  async register() {
    const email: string = this.registerForm.get('email')?.value!;
    const password: string = this.registerForm.get('password')?.value!;

    this.authService.register(email, password).subscribe(result => {
      if(result) {
        this.router.navigate(["auth","login"]);
        this.snackBar.open('Usuario creado con éxito.', 'Done');
      }
    });
  }

  login() {
    this.router.navigate(["auth","login"]);
  }
}
