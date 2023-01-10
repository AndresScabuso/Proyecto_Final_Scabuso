import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ICrudService } from '../interfaces/ICrudService';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements ICrudService<Student> {

  public studentsData$: Observable<Student[]>;
  private studentsData = new BehaviorSubject<Student[]>([]);

  constructor() {
    this.studentsData$ = this.studentsData.asObservable();
    this.studentsData.next([
         new Student(1, 'Lionel', 'Messi', 'lmessi@gmail.com', true),
         new Student(2, 'Angel', 'Di Maria', 'adimaria@gmail.com', true)
        ]);
  }

  add(item: Student) {
    let studentsAux = this.studentsData.getValue();
    item.id = studentsAux.length > 0 ? (studentsAux[studentsAux.length - 1].id + 1) : 1;
    studentsAux.push(item);
    this.studentsData.next(studentsAux.sort(s => s.id));
  }

  update(item: Student, id: number) {
    let studentsAux = this.studentsData.getValue().filter(p => p.id !== id);
    item.id = id;
    studentsAux.push(item);
    this.studentsData.next(studentsAux);
  }

  delete(id: number) {
    let studentsAux = this.studentsData.getValue().filter(p => p.id !== id);
    this.studentsData.next(studentsAux);
  }
}
