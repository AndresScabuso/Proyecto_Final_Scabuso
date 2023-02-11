import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://63c5fccae1292e5bea2ddaae.mockapi.io/api/scabuso/';

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  // Get user by id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/:' + id);
  }

  // Get user by id and pass
  getUserByUsernamePassword(email: string, password: string ): Observable<User> {
    return this.http.get<User[]>(this.baseUrl + 'users')
      .pipe(map((value : User[]) => 
        value.filter(e => e.email == email && e.password == password)[0]));
  }

  // Save new user
  saveUser(user: User) {
    return this.http.post<User>(this.baseUrl + 'users', user);
  }

  // Update existing user
  updateUser(user: User, id: number) {
    return this.http.put<User>(this.baseUrl + 'users/' + id, user);
  }

  // Delete existing user
  deleteUserById(id: number) {
    return this.http.delete<User>(this.baseUrl + 'users/' + id);
  }
}
