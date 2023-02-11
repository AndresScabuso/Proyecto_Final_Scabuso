import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'https://63c5fccae1292e5bea2ddaae.mockapi.io/api/scabuso';

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl + 'students');
  }

  // Get student by id
  getStudentById(id: string) : Observable<Student> {
    return this.http.get<Student>(this.baseUrl + '/students/:' + id);
  }

  // Save new student
  saveStudent(student: Student) : Observable<Student> {
    return this.http.post<Student>(this.baseUrl + '/students', student);
  }

  // Update existing student
  updateStudent(student: Student, id: number) : Observable<Student> {
    return this.http.put<Student>(this.baseUrl + '/students/' + id, student);
  }

  // Delete existing user
  deleteStudentsById(id: number) {
    return this.http.delete<Student>(this.baseUrl + '/students/' + id);
  }
}
