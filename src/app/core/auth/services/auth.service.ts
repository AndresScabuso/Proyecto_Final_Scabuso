import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../models/user.interface';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _loggedUser: User | null;
  _errorMessage: string;

  constructor(private readonly userService: UsersService, private router: Router, private snackBar: MatSnackBar) {
    this._loggedUser = JSON.parse(localStorage.getItem('loggeduser')!);
  }

  register(email: string, password: string) {
     const newUser: User = { id: 0, email: email, password: password, role: 'user' };
     return this.userService.saveUser(newUser);
  }

  login(email: string, password: string) {
    this.userService.getUserByUsernamePassword(email, password).subscribe(value => {
      if(value) {
        localStorage.setItem('loggeduser', JSON.stringify(value));
        this.router.navigate(['pages', 'students']);
        this.snackBar.open('Bienvenido ' + value.email + '.', 'Done');
      }
      else 
        this.snackBar.open('Usuario y/o contraseña incorrecto(s).', 'Done');
    })  
  }

  logout() {
    localStorage.removeItem('loggeduser');
    this.router.navigate(['auth']);
    this.snackBar.open('¡Vuelve pronto ' + this._loggedUser?.email + '!', 'Done');
  }

  isLoggedIn(): boolean {
    return this._loggedUser !== null;
  }

  isAdmin(): boolean {
    return this._loggedUser?.role == 'admin';
  }

  loggedUser(): User {
    return this._loggedUser!;
  }
}
