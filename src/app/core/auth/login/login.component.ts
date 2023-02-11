import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  emailControl = new FormControl("", [Validators.required, Validators.email]);
  passwordControl = new FormControl("", [Validators.required, Validators.minLength(6)]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })

  login() {
    const user = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    };

    this.authService.login(user.email, user.password);
  }

  register() {
    this.router.navigate(["auth","register"]);
  }
}
