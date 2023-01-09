import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ICrudService } from '../ICrudService';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements ICrudService<Student> {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = "http://localhost:3000/students";
  }
  
  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url).pipe(map((res:Student[]) => { return res }))
  }

  add(item: Student) {
    return this.httpClient.post(this.url, item).pipe(map((res:any) => { return res }))
  }

  update(item: Student, id:number) {
    return this.httpClient.put(this.url + '/' + id , item).pipe(map((res:any) => { return res }))
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id).pipe(map((res:any) => { return res }))
  }
}
