import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../models/user.interface';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase: AngularFireAuth, private readonly auth: Auth, private readonly userService: UsersService, private router: Router) { 
    this.authfirebase.authState.subscribe((user) => {
      if(user) {
        localStorage.setItem('authUser', JSON.stringify(user));
        /* Busco el usuario de la tabla users relacionado al usuario autenticado */
        this.userService.getUserById(user.uid).subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      } else {
        localStorage.setItem('authUser', 'null');
      }
    })
   }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      this.authfirebase.authState.subscribe((user) => {
        if(user){
          this.router.navigate(['pages','students'])
        }
      })
      return result;
    });
  }

  logout() {
    this.auth.signOut();
    localStorage.removeItem('authUser');
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('authUser')!);
    return user !== null;
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.role == 'admin';
  }

  loggerUser(): User {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }
}
