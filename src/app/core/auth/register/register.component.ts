import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private readonly userService: UsersService, private readonly authService: AuthService, private readonly router: Router) {}

  emailControl = new FormControl("", [Validators.required, Validators.email]);
  passwordControl = new FormControl("", [Validators.required, Validators.minLength(6)]);

  registerForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })

  async register() {
    const email: string = this.registerForm.get('email')?.value!;
    const password: string = this.registerForm.get('password')?.value!;

    const res = await this.authService.register(email, password)
    .catch(error => {
      console.log(error);
    })

    if(res) {
      const id = res.user.uid;
      const user: User = {
          id: id,
          email: email,
          password: password,
          role: 'user'
      }
      this.userService.saveUser(user);
      alert("Registro completo.")
      this.router.navigate(["auth","login"]);
    }
  }

  login() {
    this.router.navigate(["auth","login"]);
  }
}
