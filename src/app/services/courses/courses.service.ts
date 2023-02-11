import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService{

  private baseUrl = 'https://63e6fa769f914b4689d20937.mockapi.io/api/scabuso/';

  constructor(private http: HttpClient) {}

  // Get all courses
  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.baseUrl + 'courses');
  }

  // Get course by id
  getCourseById(id: string) {
    return this.http.get<Course>(this.baseUrl + 'courses/:' + id);
  }

  // Save new course
  saveCourse(course: Course) {
    return this.http.post<Course>(this.baseUrl + 'courses', course);
  }

  // Update existing course
  updateCourse(course: Course, id: string) {
    return this.http.put<Course>(this.baseUrl+ 'courses/' + id, course);
  }

  // Delete existing user
  deleteCoursesById(id: string) {
    return this.http.delete<Course>(this.baseUrl + 'courses/' + id);
  }
}
